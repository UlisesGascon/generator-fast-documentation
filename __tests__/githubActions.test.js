const assert = require('yeoman-assert')
const { generateDoc, simpleDocsProps } = require('../__helpers__')

describe('generator-fast-documentation: Github Actions', () => {
  it('Should INCLUDE the github actions', async () => {
    await generateDoc({ ...simpleDocsProps, includeGithubActions: true })
    assert.file(['.github/workflows/pr_health_check.yml'])
  })
  it('Should NOT INCLUDE the github actions', async () => {
    await generateDoc({ ...simpleDocsProps, includeGithubActions: false })
    assert.noFile(['.github/workflows/pr_health_check.yml'])
  })
})
