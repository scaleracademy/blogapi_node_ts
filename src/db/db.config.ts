import { defineConfig } from '@mikro-orm/sqlite';

export default defineConfig({
  dbName: 'blog.db.sqlite',
  entitiesTs: ['src/**/*.entity.ts'],
  entities: ['dist/**/*.entity.js'],
  debug: true, // TODO: disable in production
})

