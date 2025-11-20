import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  let errorMessage: string = "Unknown error"
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="w-screen h-screen bg-slate-100 flex flex-col items-center justify-start gap-4 pt-8">
      <section className="bg-white rounded-xl shadow-md p-10 mx-6">
        <h2 className="font-bold text-xl">Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="italic">{errorMessage}</p>
      </section>
    </div>
  )
}
