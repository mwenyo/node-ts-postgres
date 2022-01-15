import { Router } from 'express'
import { routes as userRoutes } from './userRoutes'
import { routes as authRoutes } from './authRoutes'
import { routes as roleRoutes } from './roleRoutes'
import { routes as permitionRoutes } from './permitionRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/roles', roleRoutes)
routes.use('/permitions', permitionRoutes)

export { routes }
