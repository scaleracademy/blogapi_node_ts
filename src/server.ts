import express from 'express';
import { initORM } from './db/orm.init';
import { RequestContext } from '@mikro-orm/core';
import { usersRoute } from './users/users.route';

const app = express();

async function start() {
  const orm = await initORM();

  // Setup Mikro ORM per request context
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  })
  // Parse JSON bodies 
  app.use(express.json())

  app.use('/users', usersRoute)

  app.listen(8181, () => {
    console.log('Server is running on http://localhost:8181')
  })
}

start()