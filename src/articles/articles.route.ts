import { Router } from "express";
import { reqdAuth } from "../security/auth.middleware";
import { ArticlesService } from "./articles.service";

const route = Router();

const articlesService = new ArticlesService();

/**
 * GET /articles
 * get all articles
 */
route.get("/", async (req, res) => {
  const { page, size } = req.query;
  const articles = await articlesService.getAllArticles(
    page ? parseInt(page as string) : 1,
    size ? parseInt(size as string) : 10
  );
  res.status(200).json(articles);
});

/**
 * GET /articles/:slug
 * get an article by slug
 */
route.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = await articlesService.getArticleBySlug(slug);
  if (!article) {
    res.status(404).send({ message: "Article not found" });
    return;
  }
  res.status(200).json(article);
});

/**
 * POST /articles
 * create a new article
 * Only for authenticated users
 */
route.post("/", reqdAuth, async (req, res) => {
  const { title, subtitle, body, tags } = req.body;
  if (!title || !body) {
    res.status(400).send("Bad request");
    return;
  }
  const article = await articlesService.createArticle(
    req.user!!,
    title,
    subtitle,
    body,
    tags ?? []
  );
  res.status(201).json(article);
});

export const articlesRoute = route;
