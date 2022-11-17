const assert = require('yeoman-assert')
const { generateDoc, simpleDocsProps } = require('../__helpers__')

describe('generator-fast-documentation: Base Url', () => {
  it('should use DEFAULT base url', async () => {
    await generateDoc(simpleDocsProps)
    assert.fileContent('docusaurus.config.js', 'baseUrl: \'/\'')
  })

  it('should use CUSTOM base url', async () => {
    const baseUrl = '/my-custom-baseurl/'
    await generateDoc({ ...simpleDocsProps, baseUrl })
    assert.fileContent('docusaurus.config.js', `baseUrl: '${baseUrl}'`)
  })
})
