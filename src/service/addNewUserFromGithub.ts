import axios from 'axios'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { UserRepository } from '../repository'

interface GithubUserResponse {
  id: number
  login: string
  location?: string
}

const addNewUserFromGithub = async () => {
  const spinner = createSpinner('Loading...')

  const { username } = await inquirer.prompt({
    name: 'username',
    type: 'input',
    message: 'What is the github username?',
  })

  spinner.start()

  const response = await axios.get(`https://api.github.com/users/${username}`)

  if (response.status !== 200) {
    spinner.error({ text: 'Error while searching for github user' })
    return
  }

  const user = response.data as GithubUserResponse

  if (user.location.length > 255 || user.location.length < 3) {
    return spinner.error({ text: 'Location not valid' })
  }

  if (user.login.length > 255) {
    return spinner.error({ text: 'Location not valid' })
  }

  try {
    const userRepository = new UserRepository()
    await userRepository.insert(user.login, user.location)

    return spinner.success({ text: 'User saved succesfully' })
  } catch (error) {
    spinner.error({ text: 'Error while storing values in the database' })
    return
  }
}

export default addNewUserFromGithub
