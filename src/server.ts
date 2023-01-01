import express from 'express';
import { initORM } from './db/orm.init';
import { RequestContext } from '@mikro-orm/core';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!')
})

async function start() {
  const orm = await initORM();

  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  })

  app.listen(8181, () => {
    console.log('Server is running on http://localhost:8181')
  })
}

start()