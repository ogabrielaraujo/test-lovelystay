import { createSpinner } from 'nanospinner'

import { UserRepository } from '../repository'

const listAllUsers = async () => {
  const spinner = createSpinner('Loading...')

  try {
    const userRepository = new UserRepository()
    const users = await userRepository.findAll()

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
