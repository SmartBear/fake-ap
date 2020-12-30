import React, { useState } from 'react'
import {
  GlobalStyle,
  TestPageContainer,
  MethodContainer,
  MethodName,
  MethodContent,
  Token
} from './styled'
import FakeAP from 'fake-ap'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

const AP = new FakeAP({
  clientKey: 'key',
  sharedSecret: 'secret',
  userId: 'user',
  dialogUrls: {
    dialog: 'dialog.html'
  },
  notImplementedAction: console.log
})

const Method = ({ name, children }) => (
  <MethodContainer>
    <MethodName>{name}</MethodName>
    <MethodContent>{children}</MethodContent>
  </MethodContainer>
)

const TestPage = () => {
  const [token, setToken] = useState()
  const [customData, setCustomData] = useState('')
  const [lastDialogClose, setLastDialogClose] = useState()

  const getToken = async () => {
    setToken(await AP.context.getToken())
  }

  const createDialog = () => {
    AP.events.once('dialog.close', event => {
      setLastDialogClose(event)
    })

    AP.dialog.create({
      key: 'dialog',
      customData: {
        value: customData
      }
    })
  }

  const createFlag = () => {
    AP.flag.create({
      title: 'Flag title',
      body: 'Flag body',
      type: 'success'
    })
  }

  return (
    <TestPageContainer>
      <GlobalStyle />

      <Method name='AP.context.getToken'>
        <button onClick={getToken}>Generate token</button>
        <span>Current token:</span>
        <Token>{token}</Token>
      </Method>

      <Method name='AP.dialog.create'>
        <input
          type='text'
          value={customData}
          placeholder='Custom data'
          onChange={event => setCustomData(event.target.value)}
        />
        <button onClick={createDialog}>Open a dialog</button>
        <span>Last close reason: {lastDialogClose?.reason && <code>{lastDialogClose.reason}</code>}</span>
        <span>Last close data: {lastDialogClose?.data && <code>{lastDialogClose.data}</code>}</span>
      </Method>

      <Method name='AP.flag.create'>
        <button onClick={createFlag}>Create a flag</button>
      </Method>
    </TestPageContainer>
  )
}

mountComponentWhenDocumentIsReady(<TestPage />, 'root')
