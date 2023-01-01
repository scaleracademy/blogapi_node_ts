import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { UserEntity } from "../users/user.entity";

/*
{
    "id": 134,
    "title": "How the stock market fell in 2022",
    "slug": "how-stock-market-fell-2022"
    "subtitle": "An article about how the stock market had a crash in 2022",
    "body"	: "This is an article about ..... <b>stock market</b> .... <i>2022</i> .........",
    "createdAt":  "2022-02-06 03:40:55",
    "tags"	: ["finance", "stocks"]
}
 */
@Entity()
export class ArticleEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 100, nullable: false })
  title!: string;

  @Property({ length: 100, nullable: false, unique: true })
  slug!: string;

  @Property({ length: 200, nullable: true })
  subtitle?: string;

  @Property({ type: "text", length: 10000, nullable: false })
  body!: string;

  @ManyToOne({ nullable: false })
  author!: UserEntity;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ type: "array", nullable: true })
  tags: string[] = []; // TODO: add tags
}
