import { findUserByLanguage } from '../repository'

const searchUserByLanguage = async (spinner, inquirer) => {
  const { language } = await inquirer.prompt({
    name: 'language',
    type: 'input',
    message: 'Type the programming language to search for a user',
  })

  try {
    const users = await findUserByLanguage(language)

    if (spinner) spinner.stop()

    console.clear()

    console.table(users)
    return
  } catch (error) {
    throw new Error('Error while storing values in the database')
  }
}

export default searchUserByLanguage
