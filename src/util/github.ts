import axios from 'axios'
import { IUser } from '../domain'

export interface IGithubUserResponse {
  id: number
  login: string
  location?: string
}

export interface IGithubRepoReponse {
  id: number
  name: string
  topics: string[]
  url: string
}

export async function getUserInfosFromGithubAPI(
  username: string,
  spinner
): Promise<IUser | false> {
  const response = await axios.get(`https://api.github.com/users/${username}`)

  if (response.status !== 200) {
    console.error('Not possible to get user info from github')
    spinner.error()
    return false
  }

  const userInfo = response.data as IGithubUserResponse

  return {
    id: userInfo.id,
    name: userInfo.login,
    location: userInfo.location,
  } as IUser
}

export async function getUserReposFromGithubAPI(
  username: string,
  spinner
): Promise<IGithubRepoReponse[] | false> {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  )

  if (response.status !== 200 || response.data.length <= 0) {
    console.error('Error while searching for user repos')
    spinner.error()
    return false
  }

  return response.data
}

export function getLanguagesFromGithubResponse(
  repos: IGithubRepoReponse[]
): string[] {
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
