import sql from "mssql"
import { SubscriptionTypeService } from "@gym-manager/domain"
import { buildSqlSetClause } from "../utils"

export class SubscriptionTypeSqlService implements SubscriptionTypeService {
  private db: sql.ConnectionPool

  constructor(db: sql.ConnectionPool) {
    this.db = db
  }

  async getAll() {
    const result = await this.db.query(
      "SELECT Id, Price, Description FROM SubscriptionType"
    )

    return result.recordset.map(({ Id, Price, Description }) => (
      {
        id: Id,
        price: Price,
        description: Description,
      }
    ))
  }
  async getById({ id }: { id: number }) {
    const result = await this.db.query(
      `SELECT Id, Price, Description FROM SubscriptionType WHERE Id = ${id}`
    )
    const record = result.recordset[0]
    if (!record) return null

    return {
      id: record.Id,
      price: record.Price,
      description: record.Description,
    }
  }
  async create({ price, description }: { price: number, description: string }) {
    const result = await this.db.query(
      `INSERT INTO SubscriptionType (Price, Description)
        OUTPUT INSERTED.Id
        VALUES (${price}, '${description}')`
    )

    const insertedId = result.recordset[0].Id

    return {
      id: insertedId,
      price,
      description,
    }
  }
  async update(subscriptionType: { id: number, price?: number, description?: string }) {
    const { id, ...data } = subscriptionType

    const filteredData = Object.fromEntries(
      Object.entries({ Price: data.price, Description: data.description })
        .filter(([_, value]) => value)
    )
    const setStatement = buildSqlSetClause(filteredData)

    await this.db.query(
      `UPDATE SubscriptionType SET ${setStatement} WHERE Id = ${id}`
    )
  }
  async delete({ id }: { id: number }) {
    await this.db.query(`DELETE FROM SubscriptionType WHERE Id = ${id}`)
  }
}