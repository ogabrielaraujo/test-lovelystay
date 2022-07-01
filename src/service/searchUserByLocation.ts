import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { findUserByLocation } from '../repository'

const searchUserByLocation = async () => {
  const { location } = await inquirer.prompt({
    name: 'location',
    type: 'input',
    message: 'Type the location to search for a user',
  })

  const spinner = createSpinner('Loading...')

  try {
    const users = await findUserByLocation(location)

    spinner.stop()
    console.clear()

    console.table(users)
    return
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

export default searchUserByLocation
