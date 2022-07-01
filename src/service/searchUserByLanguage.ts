import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { UserRepository } from '../repository'

const searchUserByLanguage = async () => {
  const { language } = await inquirer.prompt({
    name: 'language',
    type: 'input',
    message: 'Type the programming language to search for a user',
  })

  const spinner = createSpinner('Loading...')

  try {
    const userRepository = new UserRepository()
    const users = await userRepository.findyByLanguage(language)

    spinner.stop()
    console.clear()

    console.table(users)
    return
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

export default searchUserByLanguage
