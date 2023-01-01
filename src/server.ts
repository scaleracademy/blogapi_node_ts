import express from 'express';
import { initORM } from './db/orm.init';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!')
})

async function start() {
  await initORM();

  app.listen(8181, () => {
    console.log('Server is running on http://localhost:8181')
  })
}

start()