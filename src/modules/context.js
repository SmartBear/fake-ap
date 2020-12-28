import * as jwt from 'atlassian-jwt'
import moment from 'moment'
import Logger from 'utils/logger'

class Context {
  constructor(clientKey, sharedSecret, userId) {
    this._clientKey = clientKey
    this._sharedSecret = sharedSecret
    this._userId = userId
  }

  getToken = async () => {
    if (!this._clientKey) {
      return Logger.missingConfiguration('AP.context.getToken', 'clientKey')
    }

    if (!this._sharedSecret) {
      return Logger.missingConfiguration('AP.context.getToken', 'sharedSecret')
    }

    if (!this._userId) {
      return Logger.missingConfiguration('AP.context.getToken', 'userId')
    }

    const now = moment().utc()

    const payload = {
      iss: this._clientKey,
      sub: this._userId,
      iat: now.unix(),
      exp: now.add(5, 'minutes').unix()
    }

    return jwt.encode(payload, this._sharedSecret)
  }

  getContext = async (...args) => {
    return Logger.notImplemented('AP.context.getContext', ...args)
  }
}

export default Context
