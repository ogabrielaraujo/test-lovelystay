import {
  getUserInfosFromGithubAPI,
  getUserReposFromGithubAPI,
} from '../src/util'

it('should find user info from github api', async () => {
  const infos: any = await getUserInfosFromGithubAPI('ogabrielaraujo', null)

  expect(infos.name).toBe('ogabrielaraujo')
})

it('should find user repos from github api', async () => {
  const repos: any = await getUserReposFromGithubAPI('ogabrielaraujo', null)

  expect(typeof repos[0].topics[0]).toEqual('string')
})
