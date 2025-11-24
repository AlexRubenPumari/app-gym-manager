import type { Request, ISqlType } from "mssql"

interface SqlParameter { type: ISqlType, value: unknown }

export function buildUpdateSetClause(
  request: Request, parameters: Record<string, SqlParameter>
): string {
  let setFragments: string[] = []

  for (const key in parameters) {
    const param = parameters[key] 
    if (!isSqlParameter(param)) continue

    request.input(key, param.type, param.value)
    setFragments.push(`${key} = @${key}`);
  }

  return setFragments.join(", ")
}

function isSqlParameter(data: any): data is SqlParameter {
  return (
    data &&
    typeof data === "object" &&
    typeof data.type !== "undefined" &&
    typeof data.value !== "undefined"
  )
}