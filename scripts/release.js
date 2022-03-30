const semver = require('semver')
const fs = require('fs')
const { execSync } = require('child_process')

const releaseTypes = ['major', 'minor', 'patch']
const changelogFile = 'CHANGELOG.md'

const exec = command => {
  try {
    command()
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exitCode = 1
  }
}

const release = () => {
  const releaseType = computeReleaseType()

  const oldVersion = process.env.npm_package_version
  const newVersion = semver.inc(oldVersion, releaseType)

  console.log(`Preparing ${releaseType} release from v${oldVersion} to v${newVersion}...`)

  console.log('Updating changelog...')

  updateChangelog(newVersion)

  console.log(`Creating a new version using "yarn version --${releaseType}"...`)

  createVersion(releaseType)

  console.log('Release done! GitHub will publish it.')
}

const computeReleaseType = () => {
  const args = process.argv.slice(2)

  const requestedReleaseTypes = releaseTypes.filter(releaseType => args.includes(`--${releaseType}`))

  if (requestedReleaseTypes.length === 0) {
    throw new Error('No release type specified. Please specify a new version using --major, --minor or --patch.')
  }

  if (requestedReleaseTypes.length > 1) {
    throw new Error('Multiple release types specified. Please specify a new version using --major, --minor or --patch.')
  }

  return requestedReleaseTypes[0]
}

const updateChangelog = newVersion => {
  const changelog = fs.readFileSync(changelogFile, 'utf8')
  const newChangelog = changelog.replace('## [Unreleased]', `## [Unreleased]\n\n## [${newVersion}]`)

  fs.writeFileSync(changelogFile, newChangelog, 'utf8')
  execSync(`git add ${changelogFile}`)
}

const createVersion = releaseType => {
  const command = `yarn version --${releaseType}`

  execSync(command, { stdio: 'inherit' })
}

exec(release)
