import { Router } from 'express'
import { routes as userRoutes } from './userRoutes'
import { routes as authRoutes } from './authRoutes'
import { routes as roleRoutes } from './roleRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/roles', roleRoutes)

export { routes }
