import 'dotenv/config'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import {
  addNewUserFromGithub,
  listAllUsers,
  searchUserByLanguage,
  searchUserByLocation,
} from './service'

let options: string[] = [
  'Add new user from github',
  'List all stored users',
  'Search users by location',
  'Search users by programming language',
]

async function main() {
  const spinner = createSpinner('Loading...')

  console.log('Welcome to the LovelyStay CLI :D')

  const { navigation } = await inquirer.prompt({
    name: 'navigation',
    type: 'list',
    message: 'Select an option below:',
    choices: options,
  })

  switch (navigation) {
    case 'Add new user from github':
      const { username } = await inquirer.prompt({
        name: 'username',
        type: 'input',
        message: 'What is the github username?',
      })

      addNewUserFromGithub(username, spinner)
      break

    case 'List all stored users':
      listAllUsers(spinner)
      break

    case 'Search users by location':
      searchUserByLocation(spinner, inquirer)
      break

    case 'Search users by programming language':
      searchUserByLanguage(spinner, inquirer)

    default:
      console.log('Not found')
      break
  }

  process.on('uncaughtException', (err) => {
    spinner.error({ text: err.message })
    process.exit(1) // mandatory (as per the Node.js docs)
  })
}

main()
