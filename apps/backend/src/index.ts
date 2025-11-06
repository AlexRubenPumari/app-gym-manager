import express from "express"

const PORT = 3000
const app = express()

app.get('/', (_, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log("Listening in localhost:" + PORT)  
})