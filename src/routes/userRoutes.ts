import { Router } from 'express'
import { body, param } from 'express-validator'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { is } from '@middlewares/ensureAuthorizated'
import { CreateUserAccessControlListController } from '@controllers/User/CreateUserAccessControlListController'
import { CreateUserController } from '@controllers/User/CreateUserController'
import { UpdateUserController } from '@controllers/User/UpdateUserController'
import { DeleteUserController } from '@controllers/User/DeleteUserController'
import { GetAllUsersController } from '@controllers/User/GetAllUsersController'
const routes = Router()

// ROUTE: GET ALL USERS
routes.get(
  '/',
  ensureAuthenticated(),
  is(['admin']),
  new GetAllUsersController().handle
)

// ROUTE: CREATE USER
routes.post(
  '/',
  [
    body('name', 'Name is too short')
      .isLength({ min: 3 })
      .trim(),
    body('email', 'Invalid email')
      .isEmail(),
    body('password', 'Passowrd is too short').isLength({ min: 8 })
  ],
  new CreateUserController().handle
)

// ROUTE: UPDATE USER
routes.put(
  '/:userId',
  ensureAuthenticated(),
  [
    param('userId', 'Invalid UUID').isUUID('4'),
    body('name', 'Invalid name').isLength({ min: 4 }).trim().optional({ checkFalsy: true }),
    body('description', 'Invalid description').isLength({ min: 4 }).trim().optional({ checkFalsy: true })
  ],
  new UpdateUserController().handle
)

// ROUTE: DELETE USER
routes.delete(
  '/:userId',
  ensureAuthenticated(),
  // can(['delete_user']),
  [
    param('userId', 'Invalid UUID').isUUID('4')
  ],
  new DeleteUserController().handle
)

// ROUTE: CREATE USER ACL LIST
routes.post(
  '/acl',
  ensureAuthenticated(),
  [
    body('permissions.*', 'Invalid UUID').isUUID('4')
  ],
  new CreateUserAccessControlListController().handle
)

export { routes }
