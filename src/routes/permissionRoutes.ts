import { Router } from 'express'
import { body, param } from 'express-validator'
import { CreatePermissionController } from '@controllers/Permission/CreatePermissionController'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { can, is } from '@middlewares/ensureAuthorizated'
import { GetAllPermissionsController } from '@controllers/Permission/GetAllPermissionsController'
import { UpdatePermissionController } from '@controllers/Permission/UpdatePermissionController'
import { DeletePermissionController } from '@controllers/Permission/DeletePermissionController'
const routes = Router()

// ROUTE: GET ALL ROLES
routes.get(
  '/',
  ensureAuthenticated(),
  is(['admin', 'developer']),
  new GetAllPermissionsController().handle
)

// ROUTE: CREATE PERMITION
routes.post(
  '/',
  ensureAuthenticated(),
  can(['update_permission']),
  [
    body('name', 'Name is too short')
      .isLength({ min: 3 })
      .trim(),
    body('description', 'Description is too short')
      .isLength({ min: 5 })
      .trim()
  ],
  new CreatePermissionController().handle
)

// ROUTE: UPDATE
routes.put(
  '/:permissionId',
  ensureAuthenticated(),
  is(['admin']),
  [
    param('permissionId', 'Invalid UUID').isUUID('4').optional({ checkFalsy: true }),
    body('name', 'Invalid name').isLength({ min: 4 }).trim().optional({ checkFalsy: true }),
    body('description', 'Invalid description').isLength({ min: 4 }).trim().optional({ checkFalsy: true })
  ],
  new UpdatePermissionController().handle
)

// ROUTE: DELETE
routes.delete(
  '/:permissionId',
  ensureAuthenticated(),
  is(['admin']),
  new DeletePermissionController().handle
)

export { routes }
