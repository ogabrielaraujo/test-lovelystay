import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'

import { sleep } from './util'

async function main() {
  await sleep(2000)
  console.log('hello lovelystay')
}

main()
