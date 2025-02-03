import dotenv from 'dotenv'
import express from 'express'
import { dbConnect } from './db/index.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'

const app = express()


//env config
dotenv.config(
  {
    path: './.env'
  }
)

//db cnfig
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


//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())




//routes
app.get('/', (req, res) => {
  res.send('Hello  World!')
})
app.use('/api/v1/auth', userRoutes)


