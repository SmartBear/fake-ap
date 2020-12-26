class Jira {
  constructor(ap) {
    this._ap = ap
  }

  refreshIssuePage = (...args) => {
    return this._ap._notImplemented('AP.jira.refreshIssuePage', ...args)
  }

  getWorkflowConfiguration = (...args) => {
    return this._ap._notImplemented('AP.jira.getWorkflowConfiguration', ...args)
  }

  isDashboardItemEditable = (...args) => {
    return this._ap._notImplemented('AP.jira.isDashboardItemEditable', ...args)
  }

  openCreateIssueDialog = (...args) => {
    return this._ap._notImplemented('AP.jira.openCreateIssueDialog', ...args)
  }

  setDashboardItemTitle = (...args) => {
    return this._ap._notImplemented('AP.jira.setDashboardItemTitle', ...args)
  }

  openDatePicker = (...args) => {
    return this._ap._notImplemented('AP.jira.openDatePicker', ...args)
  }

  initJQLEditor = (...args) => {
    return this._ap._notImplemented('AP.jira.initJQLEditor', ...args)
  }

  showJQLEditor = (...args) => {
    return this._ap._notImplemented('AP.jira.showJQLEditor', ...args)
  }

  isNativeApp = (...args) => {
    return this._ap._notImplemented('AP.jira.isNativeApp', ...args)
  }
}

export default Jira
