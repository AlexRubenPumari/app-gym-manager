import { New, Member, MemberService, Updatable } from "@gym-manager/domain"
import { ConnectionPool, VarChar, Date } from "mssql"
import { filterObject, buildUpdateSetClause } from "../utils"

export class MemberSqlService implements MemberService {
  private readonly db: ConnectionPool
  constructor(db: ConnectionPool) {
    this.db = db
  }

  async create(
    { nationalId, firstName, lastName, registrationAt, phone, status }: New<Member>
  ) {
    const result = await this.db.request()
      .input("NationalId", VarChar(50), nationalId)
      .input("FirstName", VarChar(100), firstName)
      .input("LastName", VarChar(100), lastName)
      .input("RegistrationAt", Date, `${registrationAt.year}-${registrationAt.month.toString().padStart(2, "0")}-${registrationAt.day.toString().padStart(2, "0")}`)
      .input("Phone", VarChar(20), phone)
      .input("StatusName", VarChar(100), status)
      .query(`
        DECLARE @StatusId INT;
        DECLARE @MemberId INT;
        
        SELECT @StatusId = Id FROM MemberStatus WHERE Name = @StatusName;
        IF @StatusId IS NULL
        BEGIN
          INSERT INTO MemberStatus (Name) VALUES (@StatusName);
      
          SET @StatusId = SCOPE_IDENTITY();
        END

        INSERT INTO Member (
          NationalId, FirstName, LastName, RegistrationAt, Phone, StatusId
        )
        VALUES (
          @NationalId, @FirstName, @LastName, @RegistrationAt, @Phone, @StatusId
        )

        SET @MemberId = SCOPE_IDENTITY();
        SELECT
          m.Id, m.NationalId, m.FirstName, m.LastName, m.Phone, m.RegistrationAt,
          ms.Name as StatusName
        FROM Member m
        INNER JOIN MemberStatus ms ON m.StatusId = ms.Id
        WHERE m.Id = @MemberId;
      `)

    const record = result.recordset[0]

    return {
      id: record.Id,
      nationalId,
      firstName,
      lastName,
      registrationAt,
      status: record.StatusName,
      ...(phone && { phone }),
    } satisfies Member as Member
  }
  async getAll() {
    const result = await this.db.query(`
      WITH ActiveSubscription AS (
        SELECT * FROM Subscription WHERE EndAt >= CAST(GETDATE() AS DATE)
      )
      SELECT
        m.Id, m.NationalId, m.FirstName, m.LastName, m.Phone, m.RegistrationAt,
        ms.Name AS StatusName,
        a.Id AS SubscriptionId
      FROM Member m
      INNER JOIN MemberStatus ms ON m.StatusId = ms.Id
      LEFT JOIN ActiveSubscription a ON m.Id = a.MemberId;
    `)

    return result.recordset.map(({
      Id, NationalId, FirstName, LastName, Phone, RegistrationAt,
      StatusName,
      SubscriptionId
    }): Member => (
      {
        id: Id,
        nationalId: NationalId,
        firstName: FirstName,
        lastName: LastName,
        status: StatusName,
        registrationAt: formatUTCDate(RegistrationAt),
        ...(Phone ? { phone: Phone } : {}),
        ...(SubscriptionId ? { subscription: { id: SubscriptionId } } : {}),
      }
    ))
  }
  async getById(member: { id: number }) {
    return 1 as unknown as Member | null
  }
  async getByNationalId({ nationalId }: { nationalId: string }) {
    const result = await this.db.request()
      .input("NationalId", VarChar(50), nationalId)
      .query(`
        WITH ActiveSubscription AS (
          SELECT * FROM Subscription WHERE EndAt >= CAST(GETDATE() AS DATE)
        )
        SELECT
          m.Id, m.NationalId, m.FirstName, m.LastName, m.Phone, m.RegistrationAt,
          ms.Name as StatusName,
          a.Id AS SubscriptionId
        FROM Member m
        INNER JOIN MemberStatus ms ON m.StatusId = ms.Id
        LEFT JOIN ActiveSubscription a ON m.Id = a.MemberId
        WHERE m.NationalId = @NationalId;
      `)

    const record = result.recordset[0]
    if (!record) return null

    return {
      id: record.Id,
      nationalId: record.NationalId,
      firstName: record.FirstName,
      lastName: record.LastName,
      registrationAt: formatUTCDate(record.RegistrationAt),
      status: record.StatusName,
      ...(record.Phone ? { phone: record.Phone } : {}),
      ...(record.SubscriptionId ? { subscription: { id: record.SubscriptionId } } : {}),
    } satisfies Member as Member
  }
  async update(member: Updatable<Member>) {

  }
  async delete(member: { id: number }) {

  }
}

function formatUTCDate(date: Date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}