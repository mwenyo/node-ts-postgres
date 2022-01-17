import { Router } from 'express'
import { body } from 'express-validator'
import { CreatePermitionController } from '@controllers/Permition/CreatePermitionController'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { can } from '@middlewares/ensureAuthorizated'
const routes = Router()

// ROUTE: CREATE PERMITION
routes.post(
  '/',
  ensureAuthenticated(),
  can(['update_role']),
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
