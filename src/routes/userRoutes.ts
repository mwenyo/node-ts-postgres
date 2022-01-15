import { Router } from 'express'
import { body } from 'express-validator'
import { CreateUserAccessControlListController } from 'src/controllers/User/CreateUserAccessControlListController'
import { CreateUserController } from 'src/controllers/User/CreateUserController'
import { ensureAuthenticated } from 'src/middewares/ensureAuthenticated'
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
