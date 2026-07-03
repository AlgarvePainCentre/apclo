import { createSelector } from '@reduxjs/toolkit';
import { contentApi } from './contentApi';

const selectBlogArticlesResult = contentApi.endpoints.getBlogArticles.select(undefined);

export const selectBlogArticles = createSelector(
  selectBlogArticlesResult,
  (result) => result.data ?? []
);

export const selectFeaturedBlogArticles = createSelector(selectBlogArticles, (articles) =>
  [...articles]
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, 3)
);

export const selectBlogCategorySummary = createSelector(selectBlogArticles, (articles) => {
  const counts = new Map<string, number>();

  articles.forEach((article) => {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
});
