import 'dotenv/config'
import { database } from '../util'

async function up() {
  try {
    const response = await database.any(`
      CREATE SEQUENCE IF NOT EXISTS users_id_seq;

      CREATE TABLE "public"."users" (
        "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
        "name" varchar(255) NOT NULL,
        "location" varchar(255),
        PRIMARY KEY ("id")
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
