import React, { useState } from 'react'
import {
  GlobalStyle,
  TestPageContainer,
  Section,
  SectionName,
  OptionsContent,
  MethodContent,
  Token,
  Locale
} from './styled'
import FakeAP from 'fake-ap'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

const defaultOptions = {
  clientKey: 'key',
  sharedSecret: 'secret',
  userId: 'user',
  locale: 'en_US'
}

const AP = new FakeAP({
  ...defaultOptions,
  dialogUrls: {
    dialog: 'dialog.html'
  },
  notImplementedAction: console.log
})

const Options = ({ children }) => (
  <Section>
    <SectionName>Options</SectionName>
    <OptionsContent>{children}</OptionsContent>
  </Section>
)

const Method = ({ name, children }) => (
  <Section>
    <SectionName>{name}</SectionName>
    <MethodContent>{children}</MethodContent>
  </Section>
)

const TestPage = () => {
  const [options, setOptions] = useState(defaultOptions)
  const [token, setToken] = useState()
  const [customData, setCustomData] = useState('')
  const [lastDialogClose, setLastDialogClose] = useState()
  const [userLocale, setUserLocale] = useState()

  const setClientKey = clientKey => {
    AP.configure({ clientKey })
    setOptions({ ...options, clientKey })
  }

  const setSharedSecret = sharedSecret => {
    AP.configure({ sharedSecret })
    setOptions({ ...options, sharedSecret })
  }

  const setUserId = userId => {
    AP.configure({ userId })
    setOptions({ ...options, userId })
  }

  const setLocale = locale => {
    AP.configure({ locale })
    setOptions({ ...options, locale })
  }

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

  const getLocale = () => {
    AP.user.getLocale(locale => setUserLocale(locale))
  }

  return (
    <TestPageContainer>
      <GlobalStyle />

      <Options>
        <span>Client key:</span>
        <input
          type='text'
          value={options.clientKey}
          onChange={event => setClientKey(event.target.value)}
        />
        <span>Shared secret:</span>
        <input
          type='text'
          value={options.sharedSecret}
          onChange={event => setSharedSecret(event.target.value)}
        />
        <span>User ID:</span>
        <input
          type='text'
          value={options.userId}
          onChange={event => setUserId(event.target.value)}
        />
        <span>Locale:</span>
        <input
          type='text'
          value={options.locale}
          onChange={event => setLocale(event.target.value)}
        />
      </Options>

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

      <Method name='AP.user.getLocale'>
        <button onClick={getLocale}>Get locale</button>
        <span>Current locale:</span>
        <Locale>{userLocale}</Locale>
      </Method>
    </TestPageContainer>
  )
}

mountComponentWhenDocumentIsReady(<TestPage />, 'root')
