import { RequestContext } from "@mikro-orm/core";
import { UserEntity } from "./user.entity";
import { bcryptService } from "../security/bcrypt.service";
import { jwtService } from '../security/jwt.service';

export class UsersService {
  private get repo() {
    if (RequestContext.getEntityManager() === undefined) {
      throw new Error("No EntityManager found in RequestContext");
    }
    return RequestContext.getEntityManager()!!.getRepository(UserEntity);
  }

  async createUser(username: string, email: string, password: string) {
    const user = this.repo.create(
      {
        username,
        email,
        password: await bcryptService.hash(password),
      },
      { persist: true, managed: true }
    );
    await this.repo.flush();
    // TODO: handle unqie constraint errors
    user.token = await jwtService.createToken(user.id);
    return user;
  }

  async verifyUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ username });
    if (user === undefined) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcryptService.verify(
      password,
      user!!.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    user!!.token = await jwtService.createToken(user!!.id);
    return user!!;
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne(id);
    if (user === undefined) {
      throw new Error("User not found");
    }
    return user!!;
  }
}
