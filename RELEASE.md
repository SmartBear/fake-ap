# How to release a new version

## Requirements
- GitHub SmartBear/fake-ap repository access
- NPM user account with SmartBear organization access

## Release a new version

### Create a release and publish
- Run `yarn publish`
- Enter the new version when asked
- Enter your NPM account password when asked
- If the operation is a success, two commits will be created (one for the updated `lib` folder and one for the new version and tag)
- Push the commits using `yarn release:push`
- Make a release on GitHub using the new tag

**Note:** you can skip entering the new version by using `yarn publish --major`, `yarn publish --minor` or `yarn publish --patch`. This will generate a new version based on the current version.

### GitHub release
After executing the `yarn publish` command and pushing the commits, you can make a GitHub release.
For instance with version `1.0.1`:
- From the SmartBear/fake-ap repository in GitHub, go to releases and click "Draft new release"
  - Tag: v1.0.1
  - Target branch: master
  - Release title: Release 1.0.1
  - Fill the release notes
- Click on "Publish release"
