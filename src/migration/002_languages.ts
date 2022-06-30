import 'dotenv/config'
import { database } from '../util'

async function up() {
  try {
    const response = await database.any(`
      CREATE SEQUENCE IF NOT EXISTS languages_id_seq;

      CREATE TABLE "public"."languages" (
        "id" int4 NOT NULL DEFAULT nextval('languages_id_seq'::regclass),
        "userId" int4 NOT NULL,
        "name" varchar(255) NOT NULL,
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
     DROP TABLE languages;
    `)

    console.log(response)
  } catch (error) {
    console.warn(error)
  }

  return true
}

up()
