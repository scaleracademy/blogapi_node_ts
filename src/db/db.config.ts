import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/sqlite';

export default defineConfig({
  dbName: 'blog.db.sqlite',
  entitiesTs: ['src/**/*.entity.ts'],
  entities: ['dist/**/*.entity.js'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true, // TODO: disable in production
})

