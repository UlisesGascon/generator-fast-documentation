const assert = require('yeoman-assert')
const { generateDoc, simpleDocsProps } = require('../__helpers__')

describe('generator-fast-documentation: Basic', () => {
  it('should COPY the expected files', async () => {
    await generateDoc(simpleDocsProps)
    assert.file([
      // Root
      '.commitlintrc.json',
      '.dockerignore',
      '.gitignore',
      '.nvmrc',
      '.versionrc.json',
      'babel.config.js',
      'Dockerfile',
      'docusaurus.config.js',
      'package.json',
      'README.md',
      'sidebars.js',
      // Static
      'static/.nojekyll',
      'static/img/logo.png',
      'static/img/favicon.ico',
      // docs
      'docs/welcome.mdx',
      // src
      'src/css/custom.css',
      // .husky
      '.husky/commit-msg',
      '.husky/post-merge',
      '.husky/pre-commit',
      '.husky/pre-push'
    ])
  })

  it('should CUSTOMIZE some files', async () => {
    await generateDoc(simpleDocsProps)
    assert.fileContent('README.md', simpleDocsProps.title)
    assert.fileContent('README.md', simpleDocsProps.tagLine)
    assert.fileContent('.versionrc.json', simpleDocsProps.gitUrl)
    assert.fileContent('docusaurus.config.js', `title: '${simpleDocsProps.title}'`)
    assert.fileContent('docusaurus.config.js', `tagline: '${simpleDocsProps.tagLine}'`)
    assert.fileContent('docusaurus.config.js', `url: '${simpleDocsProps.url}'`)
    assert.fileContent('docusaurus.config.js', `href: '${simpleDocsProps.gitUrl}'`)
  })
})
