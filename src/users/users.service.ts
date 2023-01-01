import { RequestContext } from "@mikro-orm/core";
import { UserEntity } from "./user.entity";
import { bcryptService } from "../security/bcrypt.service";

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
      { persist: true }
    );
    this.repo.flush();
    // TODO: handle unqie constraint errors
    // TODO: save the password hash (not directly)
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
    return user!!;
  }
}
