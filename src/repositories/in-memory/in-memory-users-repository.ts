import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../prisma/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: String(this.users.length + 1),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    return user || null
  }
}
