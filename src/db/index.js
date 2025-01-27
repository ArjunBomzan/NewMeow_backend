import mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    const mongoInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`DB Connected Hostname: ${mongoInstance.connection.host} `)
  } catch (error) {
    console.log('DB connection error:', error)
    process.exit(1)
  }

}