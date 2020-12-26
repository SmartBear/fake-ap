import React, { useState, useEffect } from 'react'
import Icon from '@atlaskit/icon'
import InfoIcon from '@atlaskit/icon/glyph/info'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import WarningIcon from '@atlaskit/icon/glyph/warning'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import CloseIcon from '@atlaskit/icon/glyph/cross'
import Button from '@atlaskit/button/standard-button'
import { events } from '../../utils'

const styles = {
  flags: {
    position: 'fixed',
    top: '0',
    right: '30px'
  },
  flagContainer: {
    position: 'relative',
    marginTop: '10px',
    backgroundColor: '#FFFFFF'
  },
  flag: {
    maxHeight: '300px'
  },
  icon: color => ({
    position: 'absolute',
    top: '20px',
    left: '16px',
    color
  }),
  close: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#707070',
    cursor: 'pointer'
  },
  message: {
    padding: '20px 40px 20px 60px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    width: '300px',
    borderRadius: '3px'
  },
  title: {
    fontWeight: 'bold'
  }
}

const Flag = ({ title, body, type, actions, closeFlag }) => {
  const onActionClick = actionIdentifier => {
    events.emit('flag.action', { actionIdentifier })
  }

  const icon = {}

  switch (type) {
    case 'info':
      icon.glyph = InfoIcon
      icon.color = '#6554C0'
      break
    case 'success':
      icon.glyph = SuccessIcon
      icon.color = '#36B37E'
      break
    case 'warning':
      icon.glyph = WarningIcon
      icon.color = '#FF991F'
      break
    case 'error':
      icon.glyph = ErrorIcon
      icon.color = '#DE350B'
      break
    default:
      icon.glyph = InfoIcon
      icon.color = '#6554C0'
  }

  actions = Object.entries(actions).map(([actionIdentifier, text]) => ({ actionIdentifier, text }))

  return (
    <div style={styles.flagContainer}>
      <div style={styles.flag}>
        <div style={styles.icon(icon.color)}>
          <Icon glyph={icon.glyph} size='medium' label='' />
        </div>
        <div style={styles.close} onClick={closeFlag}>
          <Icon glyph={CloseIcon} size='medium' label='' />
        </div>
        <div style={styles.message}>
          <p style={styles.title}>{title}</p>
          {body}
          <p>
            {actions.map(
              action => (
                <Button
                  key={action.actionIdentifier}
                  onClick={() => onActionClick(action.actionIdentifier)}
                  appearance='link'
                >
                  {action.text}
                </Button>
              )
            )}
          </p>
        </div>
      </div>
    </div>
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
    <div style={styles.flags} data-testid='ap-flags'>
      {flags.map(flag => <Flag key={flag.id} {...flag.options} closeFlag={() => closeFlag(flag.id)} />)}
    </div>
  )
}

export default Flags
