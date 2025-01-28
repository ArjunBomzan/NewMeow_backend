import dotenv from 'dotenv'
import express from 'express'
import { dbConnect } from './db/index.js'
const app = express()

const hostname = '127.0.0.1'

dotenv.config(
  {
    path: './.env'
  }
)


dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`)
    })
  })
  .catch(
    (err) => {
      console.log(' connection failed', err)
    }
  )



app.get('/', (req, res) => {
  res.send('Hello  World!')
})

// app.listen(process.env.PORT, () => {
//   console.log(`App listening on port http://${hostname}:${port}`)
// })
