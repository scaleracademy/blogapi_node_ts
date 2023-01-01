import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';


@Entity()
export class UserEntity {
  @PrimaryKey({ type: 'number', autoincrement: true })
  id!: number;

  @Property({ unique: true, nullable: false })
  username!: string;

  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ nullable: false, hidden: true })
  password!: string;
  
}