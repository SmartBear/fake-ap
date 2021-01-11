# How to release a new version

## Requirements
- GitHub SmartBear/fake-ap repository access
- NPM user account with SmartBear organization access

## Release a new version

### Create a release and publish
- Run `yarn publish`
- Enter the new version when asked
- Enter your NPM account password when asked
- If the operation is a success, a new commit and tag will be created for the new version
- Push the commit and the tag using `yarn push` (or `git push --follow-tags`)
- Make a release on GitHub using the new tag

**Note:** you can skip entering the new version by using `yarn publish --major`, `yarn publish --minor` or `yarn publish --patch`. This will generate a new version based on the current version.

### GitHub release
After executing the `yarn publish` command and pushing the commit, you can make a GitHub release.
For instance with version `1.0.0`:
- From the SmartBear/fake-ap repository in GitHub, go to releases, then draft a new release with the following information:
  - Tag: v1.0.0
  - Target branch: master
  - Release title: v1.0.0
  - Fill the release notes
- Publish the release

## Using the GitHub release
If you want to try a version of the package using a GitHub release:
- Download the source code of the release and extract it
- Run `yarn` to install dependencies
- Run `yarn pack` to create a package file
- Use that package file as the source in your `package.json` file
