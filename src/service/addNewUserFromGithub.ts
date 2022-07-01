import axios from 'axios'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { findUserById, insertManyLanguages, insertUser } from '../repository'

interface GithubUserResponse {
  id: number
  login: string
  location?: string
}

interface GithubRepoReponse {
  id: number
  name: string
  topics: string[]
  url: string
}

const addNewUserFromGithub = async () => {
  const spinner = createSpinner('Loading...')

  const { username } = await inquirer.prompt({
    name: 'username',
    type: 'input',
    message: 'What is the github username?',
  })

  spinner.start()

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  )

  if (userResponse.status !== 200) {
    spinner.error({ text: 'Error while searching for github user' })
    return
  }

  const user = userResponse.data as GithubUserResponse

  const userAlreadyExists = await findUserById(user.id)

  if (userAlreadyExists) {
    spinner.warn({ text: 'User already exists' })
    return
  }

  if (user.location.length > 255 || user.location.length < 3) {
    spinner.error({ text: 'Location not valid' })
    return
  }

  if (user.login.length > 255) {
    spinner.error({ text: 'Location not valid' })
    return
  }

  // programming languages
  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`
  )

  if (reposResponse.status !== 200 || reposResponse.data.length <= 0) {
    spinner.error({ text: 'Error while searching for user repos' })
    return
  }

  try {
    await insertUser(user.id, user.login, user.location)

    const languages = handleLanguages(reposResponse.data)
    await insertManyLanguages(user.id, languages)

    return spinner.success({ text: 'User saved succesfully' })
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

function handleLanguages(repos: GithubRepoReponse[]): string[] {
  let languages: string[] = []

  // get all topics
  repos.map((repo: GithubRepoReponse) => {
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
