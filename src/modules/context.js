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

    const context = await this.getContext()

    const iat = Math.trunc(Date.now() / 1000)
    const exp = iat + 300

    const payload = {
      iss: config.clientKey,
      sub: config.userId,
      qsh: 'context-qsh',
      context,
      iat,
      exp
    }

    const token = jwt.encodeSymmetric(payload, config.sharedSecret)

    callback(token)

    return token
  }

  getContext = async (callback = () => {}) => {
    const context = {}
    const jira = {}

    if (config.contextJiraProjectId || config.contextJiraProjectKey) {
      jira.project = {}

      if (config.contextJiraProjectId) {
        jira.project.id = config.contextJiraProjectId
      }

      if (config.contextJiraProjectKey) {
        jira.project.key = config.contextJiraProjectKey
      }
    }

    if (config.contextJiraIssueId || config.contextJiraIssueKey) {
      jira.issue = {}

      if (config.contextJiraIssueId) {
        jira.issue.id = config.contextJiraIssueId
      }

      if (config.contextJiraIssueKey) {
        jira.issue.key = config.contextJiraIssueKey
      }
    }

    if (jira.project || jira.issue) {
      context.jira = jira
    }

    callback(context)

    return context
  }
}

const context = new Context()

export default context
