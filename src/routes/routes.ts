import { Router } from 'express'
import { CreateCategoryController } from 'src/controllers/CreateCategoryController'

const routes = Router()

routes.post('/categories', new CreateCategoryController().handle)

export { routes }
