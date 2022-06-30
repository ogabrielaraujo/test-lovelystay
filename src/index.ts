import 'dotenv/config'
import inquirer from 'inquirer'

import {
  addNewUserFromGithub,
  listAllUsers,
  searchUserByLocation,
} from './service'

let options: string[] = [
  'Add new user from github',
  'List all stored users',
  'Search users by location',
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

    default:
      console.log('Not found')
      break
  }
}

main()
