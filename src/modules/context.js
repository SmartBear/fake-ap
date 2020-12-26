import * as jwt from 'atlassian-jwt'
import moment from 'moment'

class Context {
  constructor(ap) {
    this._ap = ap
  }

  getToken = async () => {
    if (!this._ap._config.tenant.clientKey) {
      return this._ap._missingConfiguration('AP.context.getToken', 'clientKey')
    }

    if (!this._ap._config.tenant.sharedSecret) {
      return this._ap._missingConfiguration('AP.context.getToken', 'sharedSecret')
    }

    if (!this._ap._config.user.id) {
      return this._ap._missingConfiguration('AP.context.getToken', 'userId')
    }

    const now = moment().utc()

    const payload = {
      iss: this._ap._config.tenant.clientKey,
      sub: this._ap._config.user.id,
      iat: now.unix(),
      exp: now.add(5, 'minutes').unix()
    }

    return jwt.encode(payload, this._ap._config.tenant.sharedSecret)
  }

  getContext = async (...args) => {
    return this._ap._notImplemented('AP.context.getContext', ...args)
  }
}

export default Context
