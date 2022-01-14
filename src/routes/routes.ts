import { Router } from 'express'
import { routes as userRoutes } from './userRoutes'
import { routes as authRoutes } from './authRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)

export { routes }
