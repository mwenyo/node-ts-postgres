import { Router } from 'express'
import { body } from 'express-validator'
import { CreateRoleController } from 'src/controllers/Role/CreateRoleController'
import { CreateRolePermitionController } from 'src/controllers/Role/CreateRolePermitionController'
import { ensureAuthenticated } from 'src/middewares/ensureAuthenticated'
const routes = Router()

// ROUTE: CREATE ROLE
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
  new CreateRoleController().handle
)

// ROUTE: CREATE ROLE_PERMITION
routes.post(
  '/permitions',
  ensureAuthenticated(),
  [
    body('role', 'Invalid UUID').isUUID('4'),
    body('permitions.*', 'Invalid UUID').isUUID('4')
  ],
  new CreateRolePermitionController().handle
)

export { routes }
