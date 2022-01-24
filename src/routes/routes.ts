import { Request, Response, Router } from 'express'
import { routes as userRoutes } from './userRoutes'
import { routes as authRoutes } from './authRoutes'
import { routes as roleRoutes } from './roleRoutes'
import { routes as permissionRoutes } from './permissionRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/roles', roleRoutes)
routes.use('/permissions', permissionRoutes)

routes.get('/', (resquest: Request, response: Response) => {
  response.status(200).json({ message: '🏡 Bem-vindo(a) a API iRent-IFPI 2021.2' })
})

export { routes }
