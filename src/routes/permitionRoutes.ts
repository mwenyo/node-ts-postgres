import { Router } from 'express'
import { body, param } from 'express-validator'
import { CreatePermitionController } from '@controllers/Permition/CreatePermitionController'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { can, is } from '@middlewares/ensureAuthorizated'
import { GetAllPermitionsController } from '@controllers/Permition/GetAllPermitionsController'
import { UpdatePermitionController } from '@controllers/Permition/UpdatePermitionController'
import { DeletePermitionController } from '@controllers/Permition/DeletePermitionController'
const routes = Router()

// ROUTE: GET ALL ROLES
routes.get(
  '/',
  ensureAuthenticated(),
  is(['admin', 'developer']),
  new GetAllPermitionsController().handle
)

// ROUTE: CREATE PERMITION
routes.post(
  '/',
  ensureAuthenticated(),
  can(['update_permition']),
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

// ROUTE: UPDATE
routes.put(
  '/:permitionId',
  ensureAuthenticated(),
  is(['admin']),
  [
    param('permitionId', 'Invalid UUID').isUUID('4').optional({ checkFalsy: true }),
    body('name', 'Invalid name').isLength({ min: 4 }).trim().optional({ checkFalsy: true }),
    body('description', 'Invalid description').isLength({ min: 4 }).trim().optional({ checkFalsy: true })
  ],
  new UpdatePermitionController().handle
)

// ROUTE: DELETE
routes.delete(
  '/:permitionId',
  ensureAuthenticated(),
  is(['admin']),
  new DeletePermitionController().handle
)

export { routes }
