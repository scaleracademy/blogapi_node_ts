import { RequestContext } from '@mikro-orm/core';
import { UserEntity } from './user.entity';

export class UsersService {
  private get repo() {
    if (RequestContext.getEntityManager() === undefined) {
      throw new Error('No EntityManager found in RequestContext');
    }
    return RequestContext.getEntityManager()!!.getRepository(UserEntity);
  }

  async createUser(username: string, email: string, password: string) {
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    this.repo.persistAndFlush(newUser);
    // TODO: handle unqie constraint errors
    // TODO: save the password hash (not directly)
    return newUser;
  }
}