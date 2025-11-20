import { Input, Button } from "../components"

export function LoginPage() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <form className="bg-white rounded-xl shadow-md px-12 py-14">
        <h2 className="font-bold text-xl text-center mb-4">Welcome back!</h2>
        <Input
          className="mb-8"
          placeholder="john.doe@example.com"
          label="Email address:"
          autoFocus
        />
        <Input
          className="mb-10"
          placeholder=""
          label="Password:"
        />
        <Button variant="primary" className="block mx-auto">Log in</Button>
      </form>
    </div>
  )
}