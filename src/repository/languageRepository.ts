import db from '../util/database'

export class LanguageRepository {
  async insert(userId: number, name: string): Promise<string | any[]> {
    try {
      const response = await db.oneOrNone(
        'INSERT INTO languages ("userId", "name") VALUES ($1, $2)',
        [userId, name]
      )

      return response
    } catch (error) {
      return 'Database error'
    }
  }

  async insertMany(
    userId: number,
    languages: string[]
  ): Promise<string | any[]> {
    return await db.tx((tx) => {
      const queries = languages.map((language: string) => {
        return tx.none(
          'INSERT INTO languages ("userId", "name") VALUES ($1, $2)',
          [userId, language]
        )
      })

      return tx.batch(queries)
    })
  }
}
