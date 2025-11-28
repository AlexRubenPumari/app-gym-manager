import { sqlConfig } from "../dist/db/config"
import sql from "mssql"

async function buildDatabase() {
  const masterConfig = { ...sqlConfig, database: "master" }

  try {
    const masterDb = await sql.connect(masterConfig)

    await masterDb.query(`
      IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GymManager')
      BEGIN
          CREATE DATABASE GymManager;
      END
    `)

    await masterDb.close()

    const db = await sql.connect(sqlConfig)

    await db.query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SubscriptionType')
      BEGIN
          CREATE TABLE SubscriptionType (
              Id INT PRIMARY KEY IDENTITY(1,1),
              Price DECIMAL(10,2) NOT NULL,
              Description VARCHAR(100) NULL
          );
      END

      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'MemberStatus')
      BEGIN
          CREATE TABLE MemberStatus (
              Id INT PRIMARY KEY IDENTITY(1,1),
              Name VARCHAR(100) NOT NULL
          );
      END
    `)

    await db.query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Member')
      BEGIN
          CREATE TABLE Member (
              Id INT PRIMARY KEY IDENTITY(1,1),
              NationalId VARCHAR(50) NOT NULL,
              RegistrationAt DATE NOT NULL,
              StatusId INT NOT NULL,
              FirstName VARCHAR(100) NOT NULL,
              LastName VARCHAR(100) NOT NULL,
              Phone VARCHAR(20) NULL,
              CONSTRAINT FKMemberMemberStatus
                  FOREIGN KEY (StatusId) REFERENCES MemberStatus(Id)
          );
      END

      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Subscription')
      BEGIN
          CREATE TABLE Subscription (
              Id INT PRIMARY KEY IDENTITY(1,1),
              StartAt DATE NOT NULL,
              EndAt DATE NOT NULL,
              MemberId INT NOT NULL,
              SubscriptionTypeId INT NOT NULL,
              CONSTRAINT FKSubscriptionSubscriptionType
                  FOREIGN KEY (SubscriptionTypeId) REFERENCES SubscriptionType(Id),
              CONSTRAINT FKSubscriptionMember
                  FOREIGN KEY (MemberId) REFERENCES Member(Id)
          );
      END   
    `)

    await db.query(`
      INSERT INTO MemberStatus (Name) VALUES ('active'), ('banned');
    `)

    await db.query(`
      INSERT INTO Member (NationalId, RegistrationAt, StatusId, FirstName, LastName, Phone) VALUES
        ('NI-1001', '2024-01-15', 1, 'Carlos', 'Ramírez', '555-1010'),
        ('NI-1002', '2024-02-10', 1, 'María', 'González', '555-2020'),
        ('NI-1003', '2024-03-05', 2, 'Jorge', 'López', '555-3030'),
        ('NI-1004', '2024-01-25', 1, 'Ana', 'Martínez', '555-4040'),
        ('NI-1005', '2024-02-18', 1, 'Luis', 'Torres', '555-5050'),
        ('NI-1006', '2024-03-12', 2, 'Sofía', 'Hernández', '555-6060'),
        ('NI-1007', '2024-04-01', 1, 'Ricardo', 'Vargas', '555-7070'),
        ('NI-1008', '2024-04-15', 1, 'Elena', 'Cruz', '555-8080'),
        ('NI-1009', '2024-05-03', 2, 'Pablo', 'Santos', '555-9090'),
        ('NI-1010', '2024-05-20', 1, 'Lucía', 'Mendoza', '555-1111');
    `)
  } catch (error) {
    console.log("fallo al construir la base de datos", error)
  }
}

buildDatabase()