import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { UserEntity } from "../users/user.entity";
import { ArticleEntity } from "../articles/article.entity";

/*
{
    "id": 1344,
    "title": "great article",
    "body" : "this was a great article, loved reading it!",
    "createdAt: "2022-02-07 03:40:55"
}
 */

@Entity()
export class CommentEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 100, nullable: false })
  title!: string;

  @Property({ type: "text", length: 3000, nullable: false })
  body!: string;

  @ManyToOne({ nullable: false })
  author!: UserEntity;

  @ManyToOne({ nullable: false })
  article!: ArticleEntity;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;
}
