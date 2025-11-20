interface Column {
  label: string
  key: string
}
type Data = Record<string, string | number>
interface TableProps {
  columns: Column[],
  data?: Data[],
}
export function Table({ columns, data }: TableProps) {
  const tableHeadClassName = "px-4 py-1 text-left font-medium"
  return (
    <div>
      <table className="w-full">
        <thead className="border-b-2 border-neutral-900">
          <tr className="uppercase">
            {
              columns.map(column => (
                <th className={tableHeadClassName} key={column.key}>
                  {column.label}
                </th>
              ))
            }
          </tr>
        </thead>
        {
          data && (
            <tbody className="divide-y divide-neutral-200">
              {
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-neutral-100 transition-colors">
                    {columns.map(({ key }) => (
                      <td className="px-4 py-1 text-left" key={key}>{row[key]}</td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          )
        }
      </table>
      {
        !data && (
          <p className="w-full text-center py-4">
            This table is empty. Create your first entry!
          </p>
        )
      }
    </div>
  )
}