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

  try {
    const user = await usersService.createUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

/**
 * POST /users/login
 * login a user
 */
route.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersService.verifyUser(username, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
});

export const usersRoute = route;
