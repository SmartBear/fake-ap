import events from 'modules/events'

class Flag {
  _nextId = 1

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

const flag = new Flag()

export default flag
