# Changelog

## [Unreleased]

- Context is now configured by providing a context object directly instead of specific information
  - Any content is accepted for the context
  - This affects both `AP.context.getToken` and `AP.context.getContext`

## [1.2.0]

- Implement `AP.context.getContext`
  - For now only Jira projects and issues are supported
  - It is possible to configure the context returned by providing information to the Fake AP configuration
- Update `AP.context.getToken` to include the context returned from `AP.context.getContext`
- Remove the `moment` package dependency

## [1.1.1]

- Upgrade dependencies

## [1.1.0]

- Add QSH to AP.context.getToken
- Upgrade dependencies

## [1.0.2]

- Setup a new package release process that will also release on GitHub Packages

## [1.0.1]

- Update and improve the README

## [1.0.0]

Initial release
