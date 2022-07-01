import 'dotenv/config'
import inquirer from 'inquirer'

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
  console.log('Welcome to the LovelyStay CLI :D')

  const { navigation } = await inquirer.prompt({
    name: 'navigation',
    type: 'list',
    message: 'Select an option below:',
    choices: options,
  })

  switch (navigation) {
    case 'Add new user from github':
      addNewUserFromGithub()
      break

    case 'List all stored users':
      listAllUsers()
      break

    case 'Search users by location':
      searchUserByLocation()
      break

    case 'Search users by programming language':
      searchUserByLanguage()

    default:
      console.log('Not found')
      break
  }
}

main()
