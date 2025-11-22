export const members = {
  get: async () => {
    return await fetch("http://localhost:3000/api/v1/members")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        return response.json()
      })
      .then(result => {
        console.log(result)
        return result.data.members
      })
  }
}