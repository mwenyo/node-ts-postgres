import { Router } from 'express'
import { body } from 'express-validator'
import { CreateUserAccessControlListController } from '@controllers/User/CreateUserAccessControlListController'
import { CreateUserController } from '@controllers/User/CreateUserController'
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { UpdateUserController } from '@controllers/User/UpdateUserController'
const routes = Router()

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
  new UpdateUserController().handle
)

// ROUTE: CREATE USER ACL LIST
routes.post(
  '/acl',
  ensureAuthenticated(),
  [
    body('permitions.*', 'Invalid UUID').isUUID('4')
  ],
  new CreateUserAccessControlListController().handle
)

export { routes }
