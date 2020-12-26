import React from 'react'
import { events, mountComponentWhenDocumentIsReady } from '../utils'
import Flags from '../components/Flags'

class Flag {
  _nextId = 1

  constructor(ap) {
    this._ap = ap

    mountComponentWhenDocumentIsReady(<Flags />, 'ap_flags')
  }

  create = options => {
    const id = this._nextId
    const title = options.title ?? ''
    const body = options.body ?? ''
    const type = ['info', 'success', 'warning', 'error'].includes(options.type) ? options.type : 'info'
    const close = ['manual', 'auto'].includes(options.close) ? options.close : 'manual'
    const actions = options.actions ?? {}

    events.emit(
      'flag.create',
      {
        id,
        options: {
          title,
          body,
          type,
          close,
          actions
        }
      }
    )

    this._nextId = this._nextId + 1

    return {
      close: () => {
        events.emit('flag.close', id)
      }
    }
  }
}

export default Flag
