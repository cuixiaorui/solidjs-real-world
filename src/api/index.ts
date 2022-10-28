import { send } from "./send";

export const Auth = {
  current: () => send("get", "/user", undefined, "user"),
  login: (email: any, password: any) =>
    send("post", "/users/login", { user: { email, password } }),
  register: (username: any, email: any, password: any) =>
    send("post", "/users", { user: { username, email, password } }),
  save: (user: any) => send("put", "/user", { user }),
};

export const Tags = {
  getAll: () => send("get", "/tags", undefined, "tags"),
};

export const limit = (count: number, p: number) =>
  `limit=${count}&offset=${p ? p * count : 0}`;
export const omitSlug = (article: any) =>
  Object.assign({}, article, { slug: undefined });

export const Articles = {
  all: (page: any, lim = 10) => send("get", `/articles?${limit(lim, page)}`),
  byAuthor: (author: string | number | boolean, page: any) =>
    send("get", `/articles?author=${encodeURIComponent(author)}&${limit(5, page)}`),
  byTag: (tag: string | number | boolean, page: any, lim = 10) =>
    send("get", `/articles?tag=${encodeURIComponent(tag)}&${limit(lim, page)}`, undefined, "articles"),
  del: (slug: any) => send("delete", `/articles/${slug}`),
  favorite: (slug: any) => send("post", `/articles/${slug}/favorite`),
  favoritedBy: (author: string | number | boolean, page: any) =>
    send("get", `/articles?favorited=${encodeURIComponent(author)}&${limit(5, page)}`),
  feed: () => send("get", "/articles/feed?limit=10&offset=0"),
  get: (slug: any) => send("get", `/articles/${slug}`, undefined, "articles"),
  unfavorite: (slug: any) => send("delete", `/articles/${slug}/favorite`),
  update: (article: { slug: any }) =>
    send("put", `/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article: any) => send("post", "/articles", { article }),
};

export const Comments = {
  create: (slug: any, comment: any) =>
    send("post", `/articles/${slug}/comments`, { comment }),
  delete: (slug: any, commentId: any) =>
    send("delete", `/articles/${slug}/comments/${commentId}`),
  forArticle: (slug: any) =>
    send("get", `/articles/${slug}/comments`, undefined, "comments"),
};

export const Profile = {
  follow: (username: any) => send("post", `/profiles/${username}/follow`),
  get: (username: any) =>
    send("get", `/profiles/${username}`, undefined, "profile"),
  unfollow: (username: any) => send("delete", `/profiles/${username}/follow`),
};
