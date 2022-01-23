import { Router } from 'express'
import { body, param } from 'express-validator'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/ensureAuthorizated'
import { CreateRoleController } from '../controllers/Role/CreateRoleController'
import { CreateRolePermissionController } from '../controllers/Role/CreateRolePermissionController'
import { UpdateRoleController } from '../controllers/Role/UpdateRoleController'
import { GetAllRolesController } from '../controllers/Role/GetAllRolesController'
import { DeleteRoleController } from '../controllers/Role/DeleteRoleController'
const routes = Router()

// ROUTE: GET ALL ROLES
routes.get(
  '/',
  ensureAuthenticated(),
  is(['admin', 'developer']),
  new GetAllRolesController().handle
)

// ROUTE: CREATE ROLE
routes.post(
  '/',
  ensureAuthenticated(),
  is(['admin']),
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
  '/:roleId/permissions',
  ensureAuthenticated(),
  is(['creator', 'admin']),
  [
    param('roleId', 'Invalid UUID').isUUID('4'),
    body('permissions.*', 'Invalid UUID').isUUID('4')
  ],
  new CreateRolePermissionController().handle
)

// ROUTE: UPDATE
routes.put(
  '/:roleId',
  ensureAuthenticated(),
  is(['admin']),
  [
    param('roleId', 'Invalid UUID').isUUID('4').optional({ checkFalsy: true }),
    body('name', 'Invalid name').isLength({ min: 4 }).trim().optional({ checkFalsy: true }),
    body('description', 'Invalid description').isLength({ min: 4 }).trim().optional({ checkFalsy: true })
  ],
  new UpdateRoleController().handle
)

// ROUTE: DELETE
routes.delete(
  '/:roleId',
  ensureAuthenticated(),
  is(['admin']),
  new DeleteRoleController().handle
)

export { routes }
