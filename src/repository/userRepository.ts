import db from '../util/database'

export class UserRepository {
  async insert(name: string, location: string): Promise<string | any[]> {
    try {
      const response = await db.any(
        'INSERT INTO users ("name", "location") VALUES ($1, $2)',
        [name, location]
      )

      return response
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
}
