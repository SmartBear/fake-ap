const Logger = {
  notImplemented: () => {},
  missingConfiguration: (method, configuration) => {
    throw new Error(`Missing configuration for ${method}: ${configuration}`)
  }
}

export default Logger
