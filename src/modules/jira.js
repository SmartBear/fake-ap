import config from 'config'

class Jira {
  refreshIssuePage = (...args) => {
    return config.notImplemented('AP.jira.refreshIssuePage', ...args)
  }

  getWorkflowConfiguration = (...args) => {
    return config.notImplemented('AP.jira.getWorkflowConfiguration', ...args)
  }

  isDashboardItemEditable = (...args) => {
    return config.notImplemented('AP.jira.isDashboardItemEditable', ...args)
  }

  openCreateIssueDialog = (...args) => {
    return config.notImplemented('AP.jira.openCreateIssueDialog', ...args)
  }

  setDashboardItemTitle = (...args) => {
    return config.notImplemented('AP.jira.setDashboardItemTitle', ...args)
  }

  openDatePicker = (...args) => {
    return config.notImplemented('AP.jira.openDatePicker', ...args)
  }

  initJQLEditor = (...args) => {
    return config.notImplemented('AP.jira.initJQLEditor', ...args)
  }

  showJQLEditor = (...args) => {
    return config.notImplemented('AP.jira.showJQLEditor', ...args)
  }

  isNativeApp = (...args) => {
    return config.notImplemented('AP.jira.isNativeApp', ...args)
  }
}

const jira = new Jira()

export default jira
