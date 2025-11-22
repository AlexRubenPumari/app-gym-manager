import { useLoaderData } from "react-router-dom"
import { Table, Button } from "../components"
import type { TableData } from "../components/table"

const tableColumns = [
  { key: "id", label: "Id" },
  { key: "nationalId", label: "National id" },
  { key: "firstName", label: "Name" },
  { key: "lastName", label: "Last name" },
  { key: "phone", label: "Phone" },
]
export function MembersListPage() {
  const { members } = useLoaderData() as { members: TableData[] }
  
  return (
    <section className="bg-white rounded-xl shadow-md max-w-4xl mx-auto p-10" >
      <header className="flex gap-4 mb-6">
        <h2 className="font-bold text-xl mr-auto">Members</h2>
        <Button variant="secondary">Edit</Button>
        <Button variant="secondary">Delete</Button>
        <Button variant="primary">Add</Button>
      </header>
      <Table columns={tableColumns} data={members} />
    </section >
  )
}