import { Router } from 'express'
import { body } from 'express-validator'
import { CreateUserController } from 'src/controllers/User/CreateUserController'
const routes = Router()
routes.post(
  '/',
  [
    body('name', 'Tamanho mínimo é de 5 caracteres')
      .isLength({ min: 5 })
      .trim(),
    body('email', 'Email inválido')
      .isEmail(),
    body('password', 'Senha muito curta').isLength({ min: 8 })
  ],
  new CreateUserController().handle
)

export { routes }
