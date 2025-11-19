import { Button } from "../components"

interface User {
  name: string
}
interface HeaderProps {
  user?: User
  onLogin?: () => void
  onLogout?: () => void
  onCreateAccount?: () => void
}

export function Header({ user, onLogin, onCreateAccount, onLogout }: HeaderProps) {
  const headerClassName = "flex items-center gap-4 rounded-b-2xl shadow-md p-8"
  const titleClassName = "font-bold mr-auto text-xl"

  return (
    <header className={headerClassName}>
      <h1 className={titleClassName}>Gym Manager</h1>
      {
        user
          ? <>
              <span>Welcome, <span className="font-bold">{user.name}</span></span>
              <Button variant="primary" onClick={onLogout}>Log out</Button>
            </>
          : <>
              <Button variant="secondary" onClick={onLogin}>Log in</Button>
              <Button variant="primary" onClick={onCreateAccount}>Sign up</Button>
            </>
      }
    </header>
  )
}