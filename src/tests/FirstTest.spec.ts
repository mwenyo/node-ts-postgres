import { User } from '@models/User'

test('it shoud be ok', () => {
  const user = new User();
  user.nome = "Wenyo"
  expect(user.nome).toEqual("Wenyo")
})