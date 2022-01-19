import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './database'
import { routes } from '@routes/routes'
import corsOptions from './config/corsOptions'

const app = express()

app.use(express.urlencoded())
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use(routes)

app.listen(3000, () => console.log('⚡ Server is running!'))
