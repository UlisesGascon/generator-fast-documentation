/* eslint no-useless-escape:0 */
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const fs = require('fs')
const path = require('path')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the best ${chalk.red('generator-fast-documentation')} generator!`
      )
    )

    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Title for your website',
        validate: Boolean
      },

      {
        type: 'input',
        name: 'tagLine',
        message: 'The tagline for your website.',
        validate: Boolean
      },
      {
        type: 'input',
        name: 'url',
        message: 'URL for your website',
        validate: input => urlRegex.test(input)
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Base URL for your site.',
        default: '/'
      },
      {
        type: 'input',
        name: 'gitUrl',
        message: 'The git url',
        validate: input => urlRegex.test(input)
      },
      {
        type: 'confirm',
        name: 'includeGithubActions',
        message: 'Do you want to include github actions?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeQuickStart',
        message: 'Do you want to start the project after the generation (release, lint, start..)?',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
      this.props.filesToSkip = []
      this.props.shortTitle = this.props.title.replace(/-/g, '')

      if (!this.props.includeGithubActions) {
        this.props.filesToSkip = this.props.filesToSkip.concat([
          'github/pr_health_check.yml'
        ])
      }
    })
  }

  writing () {
    const getFiles = (dirPath, filesPaths = []) => {
      const files = fs.readdirSync(dirPath)

      files.forEach(file => {
        if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
          filesPaths = getFiles(`${dirPath}/${file}`, filesPaths)
        } else {
          filesPaths.push(path.join(dirPath, file))
        }
      })

      return filesPaths
    }

    const copyFiles = (from, to) => {
      const templatesFolder = path.join(__dirname, 'templates', from)
      const files = getFiles(templatesFolder).map(file => file.split(`${from}/`)[1])

      files.forEach(file => {
        if (this.props.filesToSkip.includes(`${from}/${file}`)) return
        if (file.endsWith('.ejs')) {
          return this.fs.copy(this.templatePath(`./${from}/${file}`), this.destinationPath(`${to}/${file.replace(/^_/, '')}`))
        }

        this.fs.copyTpl(this.templatePath(`./${from}/${file}`), this.destinationPath(`${to}/${file.replace(/^_/, '')}`), this.props)
      })
    }

    copyFiles('root', '.')
    copyFiles('static', 'static')
    copyFiles('img', 'static/img')
    copyFiles('github', '.github/workflows')
    copyFiles('docs', 'docs')
    copyFiles('css', 'src/css')
    copyFiles('husky', '.husky')
  }

  install () {
    this.installDependencies({ npm: true, bower: false, yarn: false })
  }

  end () {
    if (this.props.includeQuickStart) {
      this.spawnCommandSync('npm', ['run', 'lint:fix'])
      this.spawnCommandSync('npm', ['run', 'release', '--', '--first-release'])
      this.spawnCommandSync('npm', ['run', 'test'])
      this.spawnCommandSync('npm', ['run', 'start'])
    }
  }
}
