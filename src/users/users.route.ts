import { Router } from 'express';

const route = Router();


/**
 * POST /users
 * create a new user (signup)
 */
route.post('/', (req, res) => {
  const {username, email, password} = req.body;
  
})

/**
 * POST /users/login
 * login a user
 */
route.post('/login', (req, res) => {

})


export const usersRoute = route;