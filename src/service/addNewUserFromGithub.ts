import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { findUserById, insertManyLanguages, insertUser } from '../repository'
import {
  getUserInfosFromGithubAPI,
  getUserReposFromGithubAPI,
  IGithubRepoReponse,
} from '../util'

const addNewUserFromGithub = async (): Promise<boolean> => {
  const spinner = createSpinner('Loading...')

  const { username } = await inquirer.prompt({
    name: 'username',
    type: 'input',
    message: 'What is the github username?',
  })

  spinner.start()

  const user = await getUserInfosFromGithubAPI(username, spinner)

  if (!user) {
    spinner.warn({ text: 'User not found' })
    return false
  }

  const userAlreadyExists = await findUserById(user.id)

  if (userAlreadyExists) {
    spinner.warn({ text: 'User already exists' })
    return false
  }

  if (user.location.length > 255 || user.location.length < 3) {
    spinner.error({ text: 'Location not valid' })
    return false
  }

  if (user.name.length > 255) {
    spinner.error({ text: 'Location not valid' })
    return false
  }

  const topics = await getUserReposFromGithubAPI(username, spinner)

  try {
    await insertUser(user.id, user.name, user.location)

    if (topics) {
      const languages = getLanguagesFromGithubResponse(topics)
      await insertManyLanguages(user.id, languages)
    }

    spinner.success({ text: 'User saved succesfully' })

    return true
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return false
  }
}

function getLanguagesFromGithubResponse(repos: IGithubRepoReponse[]): string[] {
  let languages: string[] = []

  // get all topics
  repos.map((repo: IGithubRepoReponse) => {
    if (repo.topics.length <= 0) {
      return
    }

    repo.topics.map((topic: string) => {
      languages.push(topic)
    })
  })

  // remove duplicated topics
  return languages.filter(function (value, key) {
    return languages.indexOf(value) == key
  })
}

export default addNewUserFromGithub
