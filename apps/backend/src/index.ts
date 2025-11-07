import express from "express"

const PORT = 3000
const app = express()

let subscriptionTypes: { id: number, description: string, price: number }[] = [
  {
    id: 1,
    description: "Suscripción Básica",
    price: 25
  },
  {
    id: 2,
    description: "Suscripción Premium",
    price: 45
  },
  {
    id: 3,
    description: "Suscripción Elite",
    price: 75
  }
]

app.use(express.json())

app.get('/api/v1/subscription-types', (_, res) => {
  res.json(subscriptionTypes)
})
// app.get('/api/v1/subscription-types/:id', (req, res) => {
//   const subscriptionTypeId: number = Number(req.params.id)
//   const subscriptionType = subscriptionTypes.find(({ id }) => id === subscriptionTypeId)

//   res.json(subscriptionType)
// })
app.post('/api/v1/subscription-types', (req, res) => {
  const newSubscriptionType = { id: subscriptionTypes.length + 1, ...req.body }
  subscriptionTypes.push(newSubscriptionType)
  res.status(201).json(newSubscriptionType)
})
app.route('/api/v1/subscription-types/:id')
  .get((req, res) => {
  const subscriptionTypeId: number = Number(req.params.id)
  const subscriptionType = subscriptionTypes.find(({ id }) => id === subscriptionTypeId)

  res.json(subscriptionType)
  })

app.patch('/api/v1/subscription-types/:id', (req, res) => {
  const subscriptionTypeId: number = Number(req.params.id)
  const x = subscriptionTypes.find(({ id }) => subscriptionTypeId === id)
  if (!x) return res.status(404).json({ mensaje: "Usuario no encontrado" })

  const cambios = req.body
  Object.assign(x, cambios)

  res.send("Editado correctamente")
})
app.delete('/api/v1/subscription-types/:id', (req, res) => {
  const subscriptionTypeId: number = Number(req.params.id)
  subscriptionTypes = subscriptionTypes.filter(({ id }) => id !== subscriptionTypeId)

  res.send("Eliminado correctamente")
})

app.listen(PORT, () => {
  console.log("Server listening in: localhost:" + PORT)
})