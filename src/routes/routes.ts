import { Router } from 'express'
import { CreateCategoryController } from 'src/controllers/CreateCategoryController'
import { GetAllCategoriesController } from 'src/controllers/GetAllCategoriesController'

const routes = Router()

routes.get('/categories', new GetAllCategoriesController().handle)
routes.post('/categories', new CreateCategoryController().handle)

export { routes }
