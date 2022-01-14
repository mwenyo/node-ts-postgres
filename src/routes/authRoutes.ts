import { Router } from 'express'
import { body } from 'express-validator'
import { LoginController } from 'src/controllers/Auth/LoginController'

const routes = Router()

routes.post(
  '/login',
  [
    body('email', 'Email inválido')
      .isEmail(),
    body('password', 'Senha muito curta').isLength({ min: 8 })
  ],
  new LoginController().handle
)

export { routes }
