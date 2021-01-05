# How to Contribute

## Requirements
- GitHub smartbear/fake-ap repository access
- NPM user account with SmartBear organization access

## Release a new version

### Create a release and publish
- Run `yarn publish`
- Enter the new version when asked
- Enter your NPM account password when asked
- Push the generated commits using `yarn release:push`

**Note:** you can skip entering the new version by using `yarn publish --major`, `yarn publish --minor` or `yarn publish --patch`. This will generate a new version based on the current version.

**Information:** 2 new commits are created in the release process:
- The first (created by the `release:build` and `release:commit` scripts) updates the release files (the `lib` folder)
- The second (created by `yarn publish`) updates the version in `package.json` and adds a Git tag matching that version

### GitHub release
After executing the `yarn publish` command, you need to make a GitHub release.
For instance with version `1.0.1`:
- From the react-gherkin-editor repository in GitHub, go to releases and click "Draft new release"
  - Tag: v1.0.1
  - Target branch: master
  - Release title: Release 1.0.1
  - Fill the release notes
- Click on "Publish release"
