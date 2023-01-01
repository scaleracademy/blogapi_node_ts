import { Router } from "express";
import { reqdAuth } from '../security/auth.middleware';

const route = Router();

/**
 * POST /articles
 * create a new article
 * Only for authenticated users
 */
route.post("/", reqdAuth, (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  } 
  // TODO: actually create articles
  res.status(201).send("Article created");
});

export const articlesRoute = route;
