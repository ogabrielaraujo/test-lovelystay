import { createSpinner } from 'nanospinner'

import { findAllUsers } from '../repository'

const listAllUsers = async () => {
  const spinner = createSpinner('Loading...')

  try {
    const users = await findAllUsers()

    spinner.stop()
    console.clear()

    console.table(users)
    return
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

export default listAllUsers
