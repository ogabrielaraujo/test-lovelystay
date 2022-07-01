import axios from 'axios'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { LanguageRepository, UserRepository } from '../repository'

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
  const userRepository = new UserRepository()
  const languageRepository = new LanguageRepository()

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

  const userAlreadyExists = await userRepository.findById(user.id)

  if (userAlreadyExists) {
    return spinner.warn({ text: 'User already exists' })
  }

  if (user.location.length > 255 || user.location.length < 3) {
    return spinner.error({ text: 'Location not valid' })
  }

  if (user.login.length > 255) {
    return spinner.error({ text: 'Location not valid' })
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
    await userRepository.insert(user.id, user.login, user.location)

    // TODO refact (performance, transaction...)
    reposResponse.data.map(async (repo: GithubRepoReponse) => {
      if (repo.topics.length > 0) {
        repo.topics.map(async (topic: string) => {
          await languageRepository.insert(user.id, topic)
        })
      }
    })

    return spinner.success({ text: 'User saved succesfully' })
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

export default addNewUserFromGithub
