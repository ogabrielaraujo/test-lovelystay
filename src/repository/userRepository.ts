import db from '../util/database'

export class UserRepository {
  async insert(
    id: number,
    name: string,
    location: string
  ): Promise<string | any[]> {
    try {
      const response = await db.oneOrNone(
        'INSERT INTO users ("id", "name", "location") VALUES ($1, $2, $3)',
        [id, name, location]
      )

      return response
    } catch (error) {
      return 'Database error'
    }
  }

  async findById(id: number): Promise<string | any[]> {
    try {
      return await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id])
    } catch (error) {
      return 'Database error'
    }
  }

  async findAll(): Promise<string | any[]> {
    try {
      return await db.any('SELECT * FROM users')
    } catch (error) {
      return 'Database error'
    }
  }

  async findByLocation(location: string): Promise<string | any[]> {
    try {
      return await db.any('SELECT * FROM users WHERE location LIKE $1', [
        '%' + location + '%', // allow search for parts of location. ex: Lis for Lisbon
      ])
    } catch (error) {
      return 'Database error'
    }
  }

  async findyByLanguage(language: string): Promise<string | any[]> {
    try {
      return await db.any(
        `SELECT users.* FROM languages
        INNER JOIN users ON languages."userId" = users.id
        WHERE languages.name = $1`,
        [language]
      )
    } catch (error) {
      return 'Database error'
    }
  }
}
