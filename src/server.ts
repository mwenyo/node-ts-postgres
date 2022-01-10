import 'reflect-metadata'
import express from 'express'
import '@services/UserCreate'
import './database'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(3000, () => console.log('⚡ Server is running!'))
