import { Router } from 'express'
import { body, param } from 'express-validator'
import { CreateRoleController } from '@controllers/Role/CreateRoleController'
import { CreateRolePermitionController } from '@controllers/Role/CreateRolePermitionController'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { is } from '@middlewares/ensureAuthorizated'
import { UpdateRoleController } from '@controllers/Role/UpdateRoleController'
const routes = Router()

// ROUTE: CREATE ROLE
routes.post(
  '/',
  ensureAuthenticated(),
  is(['creator']),
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
  '/:roleId/permitions',
  ensureAuthenticated(),
  is(['creator', 'admin']),
  [
    param('roleId', 'Invalid UUID').isUUID('4'),
    body('permitions.*', 'Invalid UUID').isUUID('4')
  ],
  new CreateRolePermitionController().handle
)

// ROUTE: UPDATE
routes.post(
  '/:roleId',
  ensureAuthenticated(),
  is(['admin']),
  [
    param('roleId', 'Invalid UUID').isUUID('4'),
    body('name', 'Invalid name').isLength({ min: 4 }).trim(),
    body('description', 'Invalid description').isLength({ min: 4 }).trim()
  ],
  new UpdateRoleController().handle
)

export { routes }
