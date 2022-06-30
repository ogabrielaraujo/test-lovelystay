import inquirer from 'inquirer'

const addNewUserFromGithub = async () => {
  const { username } = await inquirer.prompt({
    name: 'username',
    type: 'input',
    message: 'What is the github username?',
  })

  console.log({ username })
}

export default addNewUserFromGithub
