import * as jwt from 'atlassian-jwt'
import moment from 'moment'
import config from 'config'

class Context {
  getToken = async (callback = () => {}) => {
    if (!config.clientKey) {
      return config.missingConfiguration('AP.context.getToken', 'clientKey')
    }

    if (!config.sharedSecret) {
      return config.missingConfiguration('AP.context.getToken', 'sharedSecret')
    }

    if (!config.userId) {
      return config.missingConfiguration('AP.context.getToken', 'userId')
    }

    const now = moment().utc()

    const payload = {
      iss: config.clientKey,
      sub: config.userId,
      qsh: 'context-qsh',
      iat: now.unix(),
      exp: now.add(5, 'minutes').unix()
    }

    const token = jwt.encode(payload, config.sharedSecret)

    callback(token)

    return token
  }

  getContext = async (...args) => {
    return config.notImplemented('AP.context.getContext', ...args)
  }
}

const context = new Context()

export default context
