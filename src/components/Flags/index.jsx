import React, { useState, useEffect } from 'react'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon
} from './icons'
import {
  FlagsContainer,
  FlagContainer,
  TypeIconContainer,
  CloseIconContainer,
  Message,
  Title,
  Actions,
  ActionButton,
  ActionText
} from './styled'
import { events } from 'utils/events'

const Flag = ({ title, body, type, actions, closeFlag }) => {
  const onActionClick = actionIdentifier => {
    events.emit('flag.action', { actionIdentifier })
  }

  let TypeIcon = InfoIcon
  let iconColor = '#6554C0'

  switch (type) {
    case 'info':
      TypeIcon = InfoIcon
      iconColor = '#6554C0'
      break
    case 'success':
      TypeIcon = SuccessIcon
      iconColor = '#36B37E'
      break
    case 'warning':
      TypeIcon = WarningIcon
      iconColor = '#FF991F'
      break
    case 'error':
      TypeIcon = ErrorIcon
      iconColor = '#DE350B'
  }

  actions = Object.entries(actions).map(([actionIdentifier, text]) => ({ actionIdentifier, text }))

  return (
    <FlagContainer>
      <TypeIconContainer color={iconColor}>
        <TypeIcon />
      </TypeIconContainer>
      <CloseIconContainer onClick={closeFlag}>
        <CloseIcon />
      </CloseIconContainer>
      <Message>
        <Title>{title}</Title>
        {body}
        <Actions>
          {actions.map(
            action => (
              <ActionButton
                key={action.actionIdentifier}
                onClick={() => onActionClick(action.actionIdentifier)}
              >
                <ActionText>{action.text}</ActionText>
              </ActionButton>
            )
          )}
        </Actions>
      </Message>
    </FlagContainer>
  )
}

const Flags = () => {
  const [flags, setFlags] = useState([])
  const [timeouts, setTimeouts] = useState({})

  useEffect(() => {
    events.on('flag.create', onFlagCreate)

    return () => {
      events.off('flag.create', onFlagCreate)
    }
  }, [flags, timeouts])

  useEffect(() => {
    events.on('flag.close', onFlagClose)

    return () => {
      events.off('flag.close', onFlagClose)
    }
  }, [flags, timeouts])

  useEffect(() => {
    return () => {
      for (const id in timeouts) {
        clearTimeout(timeouts[id])
      }
    }
  }, [])

  const onFlagCreate = flag => {
    setFlags(flags => [...flags, flag])

    if (flag.options.close === 'auto') {
      const timeout = setTimeout(() => closeFlag(flag.id), 4000)

      setTimeouts(timeouts => ({ ...timeouts, [flag.id]: timeout }))
    }
  }

  const onFlagClose = id => {
    setFlags(flags => flags.filter(flag => flag.id !== id))

    if (timeouts[id]) {
      clearTimeout(timeouts[id])
    }
  }

  const closeFlag = id => {
    events.emit('flag.close', id)
  }

  return (
    <FlagsContainer data-testid='ap-flags'>
      {flags.map(flag => <Flag key={flag.id} {...flag.options} closeFlag={() => closeFlag(flag.id)} />)}
    </FlagsContainer>
  )
}

export default Flags
