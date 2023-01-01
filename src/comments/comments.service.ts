import { RequestContext } from "@mikro-orm/core";
import { CommentEntity } from "./comment.entity";
import { ArticleEntity } from "../articles/article.entity";
import { UserEntity } from '../users/user.entity';

export class CommentsService {
  private get repo() {
    if (RequestContext.getEntityManager() === undefined) {
      throw new Error("No EntityManager found in RequestContext");
    }
    return RequestContext.getEntityManager()!!.getRepository(CommentEntity);
  }

  async getAllComments(
    article: ArticleEntity,
    page: number = 1,
    size: number = 10
  ) {
    return await this.repo.find(
      { article },
      {
        limit: size,
        offset: (page - 1) * size,
      }
    );
  }

  async createComment(article: ArticleEntity, author: UserEntity, title: string, body: string) {
    const comment = this.repo.create({ 
      article,
      author,
      title,
      body
     });
    await this.repo.flush();
    return comment;
  }
}
