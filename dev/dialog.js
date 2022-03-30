import React, { useState, useEffect } from 'react'
import {
  GlobalStyle,
  DialogStyle,
  DialogContainer,
  DialogContent,
  DialogTitle,
  DialogData,
  DialogInput,
  DialogButtons
} from './styled'
import FakeAP from 'fake-ap'
import { mountComponentWhenDocumentIsReady } from './mount-component'

const AP = new FakeAP({
  notImplementedAction: console.log
})

const Dialog = () => {
  const [customData, setCustomData] = useState()
  const [closeData, setCloseData] = useState('')

  useEffect(() => {
    AP.dialog.getCustomData(data => {
      setCustomData(data.value)
    })
  })

  const onConfirm = () => {
    AP.dialog.close({ reason: 'confirm', data: closeData })
  }

  const onCancel = () => {
    AP.dialog.close({ reason: 'cancel', data: closeData })
  }

  return (
    <DialogContainer>
      <GlobalStyle />
      <DialogStyle />

      <DialogContent>
        <DialogTitle>Dialog</DialogTitle>

        <DialogData>
          Custom data: {customData && <code>{customData}</code>}
        </DialogData>

        <DialogInput>
          <input
            type='text'
            value={closeData}
            placeholder='Custom data on close'
            onChange={event => setCloseData(event.target.value)}
          />
        </DialogInput>

        <DialogButtons>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </DialogButtons>
      </DialogContent>
    </DialogContainer>
  )
}

mountComponentWhenDocumentIsReady(<Dialog />, 'root')
