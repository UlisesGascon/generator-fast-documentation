const helpers = require('yeoman-test')
const path = require('path')

const simpleDocsProps = {
  title: 'Acme Library Docs',
  tagLine: 'The most accurate documentation ever made',
  url: 'https://library.acme.com',
  baseUrl: '/',
  gitUrl: 'https://git.acme.com',
  includeGithubActions: false,
  includeQuickStart: false
}

const generateDoc = props => helpers.run(path.join(__dirname, '../generators/app')).withPrompts(props)

module.exports = {
  generateDoc,
  simpleDocsProps
}
