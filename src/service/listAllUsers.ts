import { findAllUsers } from '../repository'

const listAllUsers = async (spinner) => {
  try {
    const users = await findAllUsers()

    if (spinner) spinner.stop()

    console.clear()

    console.table(users)
    return
  } catch (error) {
    throw new Error('Error while storing values in the database')
  }
}

export default listAllUsers
