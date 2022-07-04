import { addNewUserFromGithub } from '../src/service'

let userExample = {
  id: 123,
  name: 'Example',
  location: 'Portugal',
}

jest.mock('../src/repository', () => {
  return {
    findUserById: jest.fn(() => false),
    insertUser: jest.fn(() => true),
    insertManyLanguages: jest.fn(() => true),
  }
})

jest.mock('../src/util/github', () => {
  return {
    getUserInfosFromGithubAPI: jest.fn(() => userExample),
    getUserReposFromGithubAPI: jest.fn(() => []),
    getLanguagesFromGithubResponse: jest.fn(() => [
      'nodejs',
      'reactjs',
      'python',
    ]),
  }
})

describe('addNewUserFromGithub', () => {
  it('should have at least 3 characters on user location', async () => {
    userExample.name = 'Example'
    userExample.location = 'a'

    try {
      await addNewUserFromGithub('Example', null)
    } catch (error) {
      expect(error.message).toEqual('Location not valid')
    }
  })

  it('should not save a user with an incorrect name', async () => {
    userExample.name =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    userExample.location = 'Portugal'

    try {
      await addNewUserFromGithub('Example', null)
    } catch (error) {
      expect(error.message).toEqual('Name not valid')
    }
  })
})
