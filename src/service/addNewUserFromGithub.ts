import { findUserById, insertManyLanguages, insertUser } from '../repository'
import { getUserInfosFromGithubAPI, getUserReposFromGithubAPI } from '../util'
import { getLanguagesFromGithubResponse } from '../util/github'

const addNewUserFromGithub = async (
  username: string,
  spinner: any
): Promise<boolean> => {
  if (spinner) spinner.start()

  const user = await getUserInfosFromGithubAPI(username, spinner)

  if (!user) {
    throw new Error('User not found')
  }

  const userAlreadyExists = await findUserById(user.id)

  if (userAlreadyExists) {
    throw new Error('User already exists')
  }

  if (user.location.length > 255 || user.location.length < 3) {
    throw new Error('Location not valid')
  }

  if (user.name.length > 255) {
    throw new Error('Name not valid')
  }

  const topics = await getUserReposFromGithubAPI(username, spinner)

  try {
    await insertUser(user.id, user.name, user.location)

    if (topics) {
      const languages = getLanguagesFromGithubResponse(topics)
      await insertManyLanguages(user.id, languages)
    }

    if (spinner) spinner.success({ text: 'User saved succesfully' })

    return true
  } catch (error) {
    throw new Error('Error while storing values in the database')
  }
}

export default addNewUserFromGithub
