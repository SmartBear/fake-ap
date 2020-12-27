import React, { useState, useEffect, useRef } from 'react'
import { events } from 'utils'

const styles = {
  dialogs: {
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '3000'
  },
  iframe: {
    border: '0',
    width: '100%',
    height: '100%'
  }
}

const Dialogs = () => {
  const [dialog, setDialog] = useState(null)
  const iframeRef = useRef()

  useEffect(() => {
    events.on('dialog.create', onDialogCreate)

    return () => {
      events.off('dialog.create', onDialogCreate)
    }
  }, [dialog])

  useEffect(() => {
    events.on('dialog.close', onDialogClose)

    return () => {
      events.off('dialog.close', onDialogClose)
    }
  }, [dialog])

  useEffect(() => {
    window.addEventListener('message', onGetCustomDataMessage)

    return () => {
      window.removeEventListener('message', onGetCustomDataMessage)
    }
  }, [dialog])

  useEffect(() => {
    window.addEventListener('message', onCloseMessage)

    return () => {
      window.removeEventListener('message', onCloseMessage)
    }
  }, [dialog])

  const onDialogCreate = options => {
    setDialog(options)
  }

  const onDialogClose = () => {
    setDialog(null)
  }

  const onGetCustomDataMessage = event => {
    if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) {
      return
    }

    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.getCustomData') {
      return
    }

    window.removeEventListener('message', onGetCustomDataMessage)

    event.source.postMessage({ type: 'AP.dialog.customData', customData: dialog.customData })
  }

  const onCloseMessage = event => {
    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.close') {
      return
    }

    window.removeEventListener('message', onCloseMessage)

    events.emit('dialog.close', event.data.data)
  }

  if (!dialog) {
    return null
  }

  if (!dialog.url) {
    return null
  }

  return (
    <div style={styles.dialogs}>
      <iframe src={dialog.url} style={styles.iframe} ref={iframeRef} data-testid='ap-dialog' />
    </div>
  )
}

export default Dialogs
