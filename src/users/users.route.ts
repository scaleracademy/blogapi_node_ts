import { Router } from "express";
import { UsersService } from "./users.service";

const route = Router();

const usersService = new UsersService();
/**
 * POST /users
 * create a new user (signup)
 */
route.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  // TODO: validate username, email, password exists
  
  const user = await usersService.createUser(username, email, password);
  res.status(201).json(user);
});

/**
 * POST /users/login
 * login a user
 */
route.post("/login", (req, res) => {});

export const usersRoute = route;
