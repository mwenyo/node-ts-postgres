import express from 'express';
import '@services/UserCreate';

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(3000)
