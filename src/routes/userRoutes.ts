import { Router } from 'express'
import { body } from 'express-validator'
import { CreateUserController } from 'src/controllers/User/CreateUserController'
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

export { routes }
