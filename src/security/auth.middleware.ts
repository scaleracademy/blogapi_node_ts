import { jwtService } from "./jwt.service";
import { UsersService } from "../users/users.service";
import { Handler } from "express";

const usersService = new UsersService();

export const reqdAuth: Handler = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  // Authorization: Bearer <token>
  if (!authHeader) {
    res.status(401).send({ "message": "Unauthorized: No Auth Header Found"});
    return
  }
  const token = authHeader!!.split(" ")[1];
  if (!token) {
    res.status(401).send({ "message": "Unauthorized: No Token Found"});
    return
  }
  try {
    const userId = await jwtService.decodeToken(token);
    const user = await usersService.getUserById(userId);
    req.user = user;
    next();
  } catch (err) {
    console.error(err)
    res.status(401).send({ "message": "Unauthorized: Error parsing token"});
    return
  }
};

export const optAuth: Handler = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  // Authorization: Bearer <token>
  if (!authHeader) {
    return next();
  }
  const token = authHeader!!.split(" ")[1];
  if (!token) {
    return next();
  }
  try {
    const userId = await jwtService.decodeToken(token);
    const user = await usersService.getUserById(userId);
    req.user = user;
    next();
  } catch (err) {
    console.error(err)
    res.status(401).send({ "message": "Unauthorized: Error parsing token"});
    return
  }
};
