import dotenv from 'dotenv'
import express from 'express'
import { dbConnect } from './db/index.js'
const app = express()
const port = 5000
const hostname = '127.0.0.1'

dotenv.config(
  {
    path: './.env'
  }
)


dbConnect()
app.get('/', (req, res) => {
  res.send('Hello  World!')
})

app.listen(port, () => {
  console.log(`App listening on port http://${hostname}:${port}`)
})
