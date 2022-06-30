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
}
