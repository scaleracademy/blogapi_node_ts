import { Handler } from 'express';
import { ArticlesService } from './articles.service';

const articlesService = new ArticlesService();


export const populateArticleFromSlug: Handler = async (req, res, next) => {
  const { slug } = req.params as any;
  const article = await articlesService.getArticleBySlug(slug);
  if (article === null) {
    return res.status(404).json({ error: "Article not found" });
  }
  req.article = article;
  next();
}