import 'dotenv/config'
import { database } from '../util'

async function up() {
  try {
    const response = await database.any(`
      CREATE TABLE "public"."users" (
        "id" int4 NOT NULL,
        "name" varchar(255) NOT NULL,
        "location" varchar(255)
      );
    `)

    console.log(response)
  } catch (error) {
    console.warn(error)
  }

  return true
}

async function down() {
  try {
    const response = await database.any(`
     DROP TABLE users;
    `)

    console.log(response)
  } catch (error) {
    console.warn(error)
  }

  return true
}

up()
