import { IUser } from '../domain'
import db from '../util/database'

export async function insertUser(
  id: number,
  name: string,
  location: string
): Promise<boolean> {
  try {
    await db.oneOrNone(
      'INSERT INTO users ("id", "name", "location") VALUES ($1, $2, $3)',
      [id, name, location]
    )

    return true
  } catch (error) {
    console.warn(error)
    return false
  }
}

export async function findAllUsers(): Promise<[] | IUser[]> {
  try {
    return await db.any('SELECT * FROM users', [])
  } catch (error) {
    console.warn(error)
    return []
  }
}

export async function findUserById(id: number): Promise<IUser | false> {
  try {
    return await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
  } catch (error) {
    console.warn(error)
    return false
  }
}

export async function findUserByLocation(
  location: string
): Promise<IUser[] | [] | false> {
  try {
    return await db.any('SELECT * FROM users WHERE location LIKE $1', [
      '%' + location + '%', // allow search for parts of location. ex: Lis for Lisbon
    ])
  } catch (error) {
    console.warn(error)
    return false
  }
}

export async function findUserByLanguage(
  language: string
): Promise<IUser[] | [] | false> {
  try {
    return await db.any(
      `SELECT users.* FROM languages
      INNER JOIN users ON languages."userId" = users.id
      WHERE languages.name LIKE $1`,
      ['%' + language + '%']
    )
  } catch (error) {
    console.warn(error)
    return false
  }
}
