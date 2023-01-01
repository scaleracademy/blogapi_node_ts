import { Router } from "express";
import { CommentsService } from "./comments.service";
import { ArticlesService } from "../articles/articles.service";
import { populateArticleFromSlug } from "../articles/article-slug.middleware";
import { reqdAuth } from '../security/auth.middleware';

const route = Router({ mergeParams: true });

const commentsService = new CommentsService();
const articlesService = new ArticlesService();

/**
 * GET /articles/:slug/comments
 */
route.get("/", populateArticleFromSlug, async (req, res) => {
  const article = req.article!!;
  const comments = await commentsService.getAllComments(article);
  return res.status(200).json(comments);
});

/**
 * POST /articles/:slug/comments
 * create a new comment
 * Only for authenticated users
 */
route.post("/", reqdAuth, populateArticleFromSlug, async (req, res) => {
  const article = req.article!!;
  const { title, body } = req.body;
  const author = req.user!!;
  const comment = await commentsService.createComment(
    article,
    author,
    title,
    body
  );
  return res.status(201).json(comment);
});

export const commentsRoute = route;
