import { Router } from 'express'
import { body } from 'express-validator'
import { CreatePermitionController } from 'src/controllers/Permition/CreatePermitionController'
import { ensureAuthenticated } from 'src/middewares/ensureAuthenticated'
const routes = Router()

// ROUTE: CREATE PERMITION
routes.post(
  '/',
  ensureAuthenticated(),
  [
    body('name', 'Name is too short')
      .isLength({ min: 3 })
      .trim(),
    body('description', 'Description is too short')
      .isLength({ min: 5 })
      .trim()
  ],
  new CreatePermitionController().handle
)

export { routes }
