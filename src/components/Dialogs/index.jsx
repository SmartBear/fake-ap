import React, { useState, useEffect, useRef } from 'react'
import createPortal from 'utils/create-portal'
import { DialogsContainer } from './styled'
import events from 'modules/events'

const styles = {
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
    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.getCustomData') {
      return
    }

    window.removeEventListener('message', onGetCustomDataMessage)

    event.source.postMessage({ type: 'AP.dialog.customData', customData: dialog.customData }, '*')
  }

  const onCloseMessage = event => {
    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.close') {
      return
    }

    window.removeEventListener('message', onCloseMessage)

    events.emit('dialog.close', event.data.data)
  }

  const component = dialog?.url ? (
    <DialogsContainer>
      <iframe src={dialog.url} style={styles.iframe} ref={iframeRef} data-testid='ap-dialog' />
    </DialogsContainer>
  ) : null

  return createPortal(component, 'ap_dialogs')
}

export default Dialogs
