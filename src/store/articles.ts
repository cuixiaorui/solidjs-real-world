import { createStore } from "solid-js/store";
import { Articles } from "../api";

export function useArticlesStore() {
  return [state, setState];
}

const [state, setState] = createStore({
  articles: {},
  totalPagesCount: 10,
  page: 0,
  async unmakeFavorite(slug) {
    const article = state.articles[slug];
    if (article && article.favorited) {
      setState("articles", slug, (s: any) => ({
        favorited: false,
        favoritesCount: s.favoritesCount - 1,
      }));
      try {
        await Articles.unfavorite(slug);
      } catch (err) {
        setState("articles", slug, (s: any) => ({
          favorited: true,
          favoritesCount: s.favoritesCount + 1,
        }));
        throw err;
      }
    }
  },
  async makeFavorite(slug) {
    const article = state.articles[slug];
    if (article && !article.favorited) {
      setState("articles", slug, (s: any) => ({
        favorited: true,
        favoritesCount: s.favoritesCount + 1,
      }));
      try {
        await Articles.favorite(slug);
      } catch (err) {
        setState("articles", slug, (s: any) => ({
          favorited: false,
          favoritesCount: s.favoritesCount - 1,
        }));
        throw err;
      }
    }
  },
  async getAriclesByTag(tag: string) {
    $res(tag).then(changeArticles);
  },

  handleSetPage(page) {
    $res("", page).then(changeArticles);
  },
});

function changeArticles(data) {
  const articles = normalizeArticles(data.articles);
  setState({ articles });
}

function $res(tag, page = 0) {
  return tag ? Articles.byTag(tag, 0) : Articles.all(page);
}

function normalizeArticles(data) {
  if (!data) return {};
  return data.reduce((memo, article) => {
    memo[article.slug] = article;
    return memo;
  }, {});
}
