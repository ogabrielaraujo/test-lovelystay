import db from '../util/database'

export async function insertManyLanguages(
  userId: number,
  languages: string[]
): Promise<boolean> {
  try {
    await db.tx((tx) => {
      const queries = languages.map((language: string) => {
        return tx.none(
          'INSERT INTO languages ("userId", "name") VALUES ($1, $2)',
          [userId, language]
        )
      })

      return tx.batch(queries)
    })

    return true
  } catch (error) {
    console.warn(error)
    return false
  }
}
