import { SubscriptionTypeService, SubscriptionType } from "@gym-manager/domain"
import { New, Updatable } from "@gym-manager/domain"
import { ConnectionPool, Int, VarChar, Decimal } from "mssql"
import { filterObject, buildUpdateSetClause } from "../utils"

export class SubscriptionTypeSqlService implements SubscriptionTypeService {
  private db: ConnectionPool

  constructor(db: ConnectionPool) {
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
      } satisfies SubscriptionType as SubscriptionType
    ))
  }
  async getById({ id }: { id: number }) {
    const result = await this.db.request()
      .input("Id", Int, id)
      .query(`
        SELECT Id, Price, Description FROM SubscriptionType WHERE Id = @Id
      `)

    const record = result.recordset[0]
    if (!record) return null

    return {
      id: record.Id,
      price: record.Price,
      description: record.Description,
    } satisfies SubscriptionType as SubscriptionType
  }
  async create({ price, description }: New<SubscriptionType>) {
    const result = await this.db.request()
      .input("Price", Decimal(10, 2), price)
      .input("Description", VarChar(100), description)
      .query(`
        INSERT INTO SubscriptionType (Price, Description)
        OUTPUT INSERTED.Id
        VALUES (@Price, @Description)
      `)

    const insertedId = result.recordset[0].Id

    return {
      id: insertedId,
      price,
      description,
    } satisfies SubscriptionType as SubscriptionType
  }
  async update(subscriptionType: Updatable<SubscriptionType>) {
    const sqlParameters = {
      Price: { type: Decimal(10, 2), value: subscriptionType.price },
      Description: { type: VarChar(100), value: subscriptionType.description }
    }
    const filteredSqlParameters = filterObject(sqlParameters, property => !!property.value)

    const request = this.db.request()
    request.input("Id", Int, subscriptionType.id)
    const updateSetClause = buildUpdateSetClause(request, filteredSqlParameters)

    await request.query(`UPDATE SubscriptionType SET ${updateSetClause} WHERE Id = @Id`)
  }
  async delete({ id }: { id: number }) {
    await this.db.request()
      .input("Id", Int, id)
      .query("DELETE FROM SubscriptionType WHERE Id = @Id")
  }
}