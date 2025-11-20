import { Header, Table, Button } from "../components"

export function MembersListPage() {
  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ]
  const tableData = [
    { id: 1, name: "Juan", age: 28, city: "Madrid" },
    { id: 2, name: "Ana", age: 24, city: "Barcelona" },
    { id: 3, name: "Luis", age: 32, city: "Sevilla" },
  ]
  return (
    <div className="w-screen h-screen bg-slate-100 flex flex-col justify-start gap-4">
      <Header user={{ name: "John Doe" }} />
      <section className="bg-white rounded-xl shadow-md p-10 mx-6">
        <header className="flex gap-4 mb-6">
          <h2 className="font-bold text-xl mr-auto">Members</h2>
          <Button variant="secondary">Edit</Button>
          <Button variant="secondary">Delete</Button>
          <Button variant="primary">Add</Button>
        </header>
        <Table columns={tableColumns} data={tableData} />
      </section>
    </div>
  )
}