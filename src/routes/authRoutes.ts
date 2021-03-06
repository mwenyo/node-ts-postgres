import { Router } from 'express'
import { body, cookie } from 'express-validator'
import { LoginController } from '../controllers/Auth/LoginController'
import { RefreshAccessTokenController } from '../controllers/Auth/RefreshAccessTokenController'
import { LogoutController } from '../controllers/Auth/LogoutController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

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

routes.post(
  '/refresh',
  [
    cookie('token', 'Invalid token').isJWT()
  ],
  new RefreshAccessTokenController().handle
)

routes.get(
  '/logout',
  ensureAuthenticated(),
  new LogoutController().handle
)

export { routes }
