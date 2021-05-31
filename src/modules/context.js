import * as jwt from 'atlassian-jwt'
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

    const iat = Math.trunc(Date.now() / 1000)
    const exp = iat + 300

    const payload = {
      iss: config.clientKey,
      sub: config.userId,
      qsh: 'context-qsh',
      context: config.context,
      iat,
      exp
    }

    const token = jwt.encodeSymmetric(payload, config.sharedSecret)

    callback(token)

    return token
  }

  getContext = async (callback = () => {}) => {
    const context = config.context

    callback(context)

    return context
  }
}

const context = new Context()

export default context
