import { findUserByLocation } from '../repository'

const searchUserByLocation = async (spinner, inquirer) => {
  const { location } = await inquirer.prompt({
    name: 'location',
    type: 'input',
    message: 'Type the location to search for a user',
  })

  try {
    const users = await findUserByLocation(location)

    if (spinner) spinner.stop()

    console.clear()

    console.table(users)
    return
  } catch (error) {
    throw new Error('Error while storing values in the database')
  }
}

export default searchUserByLocation
