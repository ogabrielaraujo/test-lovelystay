import 'dotenv/config'
import inquirer from 'inquirer'

import { addNewUserFromGithub } from './service'
import { sleep } from './util'

let options: string[] = [
  'Add new user from github',
  'Search users by username',
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

    default:
      console.log('Not found')
      break
  }
}

main()
