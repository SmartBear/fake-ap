import React, { useState, useEffect } from 'react'
import {
  GlobalStyle,
  TestPageContainer,
  Section,
  SectionName,
  OptionsName,
  OptionsContent,
  MethodName,
  MethodContent,
  FormContainer,
  Form,
  FlagAction,
  RequestResponse,
  Code
} from './styled'
import FakeAP from 'fake-ap'
import * as jwt from 'atlassian-jwt'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import BackendRequestAdapter from 'request-adapter/backend'

const defaultOptions = {
  clientKey: 'key',
  sharedSecret: 'secret',
  userId: 'user',
  context: {
    key: 'value'
  },
  locale: 'en_US'
}

const defaultFlagOptions = {
  title: 'Flag title',
  body: 'Flag body',
  type: 'success',
  close: '',
  action: ''
}

const defaultRequestOptions = {
  method: 'GET',
  path: 'localhost',
  data: 'data'
}

const AP = new FakeAP({
  ...defaultOptions,
  dialogUrls: {
    dialog: 'dialog.html'
  },
  requestAdapter: new BackendRequestAdapter('/rest/api/request'),
  notImplementedAction: console.log
})

const Options = ({ children }) => (
  <Section>
    <SectionName>
      <OptionsName>Options</OptionsName>
    </SectionName>
    <OptionsContent>{children}</OptionsContent>
  </Section>
)

const Method = ({ name, onClick, children }) => (
  <Section>
    <SectionName>
      <MethodName onClick={onClick}>{name}</MethodName>
    </SectionName>
    <MethodContent>{children}</MethodContent>
  </Section>
)

const TestPage = () => {
  const [options, setOptions] = useState(defaultOptions)
  const [tokenAndPayload, setTokenAndPayload] = useState('')
  const [customData, setCustomData] = useState('')
  const [lastDialogClose, setLastDialogClose] = useState({})
  const [flagOptions, setFlagOptions] = useState(defaultFlagOptions)
  const [lastFlagAction, setLastFlagAction] = useState('')
  const [requestOptions, setRequestOptions] = useState(defaultRequestOptions)
  const [requestResponse, setRequestResponse] = useState('')
  const [userLocale, setUserLocale] = useState('')

  useEffect(() => {
    AP.events.on('flag.action', onFlagAction)

    return () => {
      AP.events.off('flag.action', onFlagAction)
    }
  }, [])

  const onFlagAction = event => {
    setLastFlagAction(event.actionIdentifier)
  }

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

  const setFlagTitle = title => {
    setFlagOptions({ ...flagOptions, title })
  }

  const setFlagBody = body => {
    setFlagOptions({ ...flagOptions, body })
  }

  const setFlagType = type => {
    setFlagOptions({ ...flagOptions, type })
  }

  const setFlagClose = close => {
    setFlagOptions({ ...flagOptions, close })
  }

  const setFlagAction = action => {
    setFlagOptions({ ...flagOptions, action })
  }

  const setRequestMethod = method => {
    setRequestOptions({ ...requestOptions, method })
  }

  const setRequestPath = path => {
    setRequestOptions({ ...requestOptions, path })
  }

  const setRequestData = data => {
    setRequestOptions({ ...requestOptions, data })
  }

  const getToken = async () => {
    const token = await AP.context.getToken()
    const payload = jwt.decodeSymmetric(token, null, 'HS256', true)

    setTokenAndPayload(`Token:\n${token}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`)
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
    const { title, body, type, close, action } = flagOptions

    const actions = {}

    if (action !== '') {
      actions[action] = `Action (${action})`
    }

    AP.flag.create({
      title,
      body,
      type,
      close,
      actions
    })
  }

  const request = async () => {
    try {
      const response = await AP.request(
        requestOptions.path,
        {
          type: requestOptions.method,
          data: requestOptions.data
        }
      )

      const body = JSON.parse(response.body)

      setRequestResponse(JSON.stringify(body, null, 2))
    } catch (error) {
      error.err = JSON.parse(error.err)
      error.xhr.responseText = JSON.parse(error.xhr.responseText)

      setRequestResponse(JSON.stringify(error, null, 2))
    }
  }

  const getLocale = () => {
    AP.user.getLocale(locale => setUserLocale(locale))
  }

  return (
    <TestPageContainer>
      <GlobalStyle />

      <Options>
        <Form>
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
        </Form>
      </Options>

      <Method name='AP.context.getToken' onClick={getToken}>
        <Code>{tokenAndPayload}</Code>
      </Method>

      <Method name='AP.dialog.create' onClick={createDialog}>
        <input
          type='text'
          value={customData}
          placeholder='Custom data'
          onChange={event => setCustomData(event.target.value)}
        />
        <span>Last close reason: {lastDialogClose.reason && <code>{lastDialogClose.reason}</code>}</span>
        <span>Last close data: {lastDialogClose.data && <code>{lastDialogClose.data}</code>}</span>
      </Method>

      <Method name='AP.flag.create' onClick={createFlag}>
        <FormContainer>
          <Form>
            <span>Title:</span>
            <input
              type='text'
              value={flagOptions.title}
              onChange={event => setFlagTitle(event.target.value)}
            />
            <span>Body:</span>
            <input
              type='text'
              value={flagOptions.body}
              onChange={event => setFlagBody(event.target.value)}
            />
            <span>Type:</span>
            <input
              type='text'
              value={flagOptions.type}
              onChange={event => setFlagType(event.target.value)}
            />
          </Form>
          <Form>
            <span>Close:</span>
            <input
              type='text'
              value={flagOptions.close}
              onChange={event => setFlagClose(event.target.value)}
            />
            <span>Action:</span>
            <input
              type='text'
              value={flagOptions.action}
              onChange={event => setFlagAction(event.target.value)}
            />
            <span>Last action:</span>
            <FlagAction value={lastFlagAction} />
          </Form>
        </FormContainer>
      </Method>

      <Method name='AP.request' onClick={request}>
        <FormContainer>
          <Form>
            <span>Method:</span>
            <input
              type='text'
              value={requestOptions.method}
              onChange={event => setRequestMethod(event.target.value)}
            />
            <span>Path:</span>
            <input
              type='text'
              value={requestOptions.path}
              onChange={event => setRequestPath(event.target.value)}
            />
            <span>Data:</span>
            <input
              type='text'
              value={requestOptions.data}
              onChange={event => setRequestData(event.target.value)}
            />
            <button onClick={() => setRequestPath(defaultRequestOptions.path)}>Success</button>
            <button onClick={() => setRequestPath('failure')}>Failure</button>
          </Form>
          <RequestResponse>
            <Code>{requestResponse}</Code>
          </RequestResponse>
        </FormContainer>
      </Method>

      <Method name='AP.user.getLocale' onClick={getLocale}>
        <Code>{userLocale}</Code>
      </Method>
    </TestPageContainer>
  )
}

mountComponentWhenDocumentIsReady(<TestPage />, 'root')
