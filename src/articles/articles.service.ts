import { RequestContext } from "@mikro-orm/core";
import { ArticleEntity } from "./article.entity";
import slugify from "slugify";
import { UserEntity } from "../users/user.entity";

export class ArticlesService {
  private get repo() {
    if (RequestContext.getEntityManager() === undefined) {
      throw new Error("No EntityManager found in RequestContext");
    }
    return RequestContext.getEntityManager()!!.getRepository(ArticleEntity);
  }

  async getAllArticles(page: number = 1, size: number = 10) {
    return await this.repo.findAll({
      limit: size,
      offset: (page - 1) * size,
      populate: ["author"],
    });
  }

  async getArticleBySlug(slug: string) {
    return await this.repo.findOne({ slug }, { populate: ["author"] });
  }

  async createArticle(
    author: UserEntity,
    title: string,
    subtitle: string,
    body: string,
    tags: string[]
  ) {
    const titleSlug = slugify(title, { lower: true, strict: true, trim: true });
    const slug = `${titleSlug.substring(0, 70)}-${Math.floor(
      Math.random() * 100000
    )}`;

    const article = this.repo.create({
      author,
      title,
      slug,
      subtitle,
      body,
      tags,
    });
    await this.repo.flush();
    return article;
  }
}
