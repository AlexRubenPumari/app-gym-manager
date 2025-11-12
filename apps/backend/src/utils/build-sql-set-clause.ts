export function buildSqlSetClause(data: Record<string, any>): string {
  const setClauses: string[] = []

  for (const field in data) {
    const value = data[field]

    if (typeof value === 'string') {
      setClauses.push(`${field} = '${value}'`)
    } else {
      setClauses.push(`${field} = ${value}`)
    }
  }

  const statement = setClauses.join(', ')

  return statement
}