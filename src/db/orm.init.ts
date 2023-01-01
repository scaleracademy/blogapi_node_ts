import { MikroORM, SqliteDriver } from '@mikro-orm/sqlite';
import dbConfig from './db.config';


export async function initORM(): Promise<MikroORM> {
  const orm = await MikroORM.init<SqliteDriver>(dbConfig)
  const generator = orm.getSchemaGenerator()
  // await generator.updateSchema({
  //   safe: false,  // TODO: change in production
  //   dropTables: true, // TODO: change in production
  // })
  await generator.dropSchema()
  await generator.createSchema()
  return orm;
}