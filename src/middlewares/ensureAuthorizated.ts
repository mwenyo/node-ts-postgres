import { NextFunction, Request, Response } from 'express'
import { UserRepository } from 'src/repositories'

export const can = (permissionsRequest: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request
      const foundUser = await UserRepository().findOne(
        {
          where: { id: userId },
          relations: ['permissions', 'roles', 'roles.permissions']
        }
      )
      if (!foundUser) return response.status(401).json({ Error: 'Usuário não encontrado' })
      const { permissions, roles } = foundUser
      const foundPermission = permissions
        .map((permission) => permission.name)
        .some((permission) => permissionsRequest.includes(permission))
      const foundRoles = roles
        .map((role) => role.permissions
          .map((permission) => permission.name)
          .some((permission) => permissionsRequest.includes(permission)))
      if (foundPermission || foundRoles.includes(true)) {
        return next()
      } else {
        return response.status(401).json({ Error: 'Usuário não tem permissão para acessar este recurso' })
      }
    } catch (error) {
      console.log(error)
      return response.status(401).json({ Error: 'Usuário não tem permissão para acessar este recurso' })
    }
  }
}

export const is = (roleRequest: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request
      const foundUser = await UserRepository().findOne(
        {
          where: { id: userId },
          relations: ['roles']
        }
      )
      if (!foundUser) return response.status(401).json({ Error: 'Usuário não encontrado' })
      const { roles } = foundUser
      const foundRoles = roles
        .map((role) => role.name)
        .some((role) => roleRequest.includes(role))
      if (!foundRoles) return response.status(403).json({ Error: 'Usuário não tem permissão necessária' })
      return next()
    } catch (error) {
      console.log(error)
      return response.status(403).json({ Error: 'Usuário não tem permissão necessária' })
    }
  }
}
