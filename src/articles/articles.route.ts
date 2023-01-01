import { Router } from "express";
import { reqdAuth } from "../security/auth.middleware";
import { ArticlesService } from "./articles.service";

const route = Router();

const articlesService = new ArticlesService();

/**
 * POST /articles
 * create a new article
 * Only for authenticated users
 */
route.post("/", reqdAuth, async (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { title, subtitle, body, tags } = req.body;
  if (!title || !body) {
    res.status(400).send("Bad request");
    return;
  }
  const article = await articlesService.createArticle(
    req.user,
    title,
    subtitle,
    body,
    tags ?? []
  );
  res.status(201).json(article);
});

export const articlesRoute = route;
