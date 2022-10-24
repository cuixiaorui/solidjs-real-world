const API_ROOT = "https://api.realworld.io/api";

const encode = encodeURIComponent;

export function createAgent([state, actions]: any) {
  // async function send(
  //   method: string,
  //   url: string,
  //   data?: { user?: any; article?: any; comment?: any } | undefined,
  //   resKey?: string | undefined
  // ) {
  //   const headers: any = {};
  //   const opts: any = { method, headers };

  //   if (data !== undefined) {
  //     headers["Content-Type"] = "application/json";
  //     opts.body = JSON.stringify(data);
  //   }

  //   if (state.token) headers["Authorization"] = `Token ${state.token}`;

  //   try {
  //     const response = await fetch(API_ROOT + url, opts);
  //     const json = await response.json();
  //     return resKey ? json[resKey] : json;
  //   } catch (err: any) {
  //     if (err && err.response && err.response.status === 401) {
  //       actions.logout();
  //     }
  //     return err;
  //   }
  // }

  // const Auth = {
  //   current: () => send("get", "/user", undefined, "user"),
  //   login: (email: any, password: any) =>
  //     send("post", "/users/login", { user: { email, password } }),
  //   register: (username: any, email: any, password: any) =>
  //     send("post", "/users", { user: { username, email, password } }),
  //   save: (user: any) => send("put", "/user", { user }),
  // };

  // const Tags = {
  //   getAll: () => send("get", "/tags", undefined, "tags"),
  // };

  // const limit = (count: number, p: number) =>
  //   `limit=${count}&offset=${p ? p * count : 0}`;
  // const omitSlug = (article: any) =>
  //   Object.assign({}, article, { slug: undefined });

  // const Articles = {
  //   all: (page: any, lim = 10) => send("get", `/articles?${limit(lim, page)}`),
  //   byAuthor: (author: string | number | boolean, page: any) =>
  //     send("get", `/articles?author=${encode(author)}&${limit(5, page)}`),
  //   byTag: (tag: string | number | boolean, page: any, lim = 10) =>
  //     send("get", `/articles?tag=${encode(tag)}&${limit(lim, page)}`),
  //   del: (slug: any) => send("delete", `/articles/${slug}`),
  //   favorite: (slug: any) => send("post", `/articles/${slug}/favorite`),
  //   favoritedBy: (author: string | number | boolean, page: any) =>
  //     send("get", `/articles?favorited=${encode(author)}&${limit(5, page)}`),
  //   feed: () => send("get", "/articles/feed?limit=10&offset=0"),
  //   get: (slug: any) => send("get", `/articles/${slug}`, undefined, "article"),
  //   unfavorite: (slug: any) => send("delete", `/articles/${slug}/favorite`),
  //   update: (article: { slug: any }) =>
  //     send("put", `/articles/${article.slug}`, { article: omitSlug(article) }),
  //   create: (article: any) => send("post", "/articles", { article }),
  // };

  // const Comments = {
  //   create: (slug: any, comment: any) =>
  //     send("post", `/articles/${slug}/comments`, { comment }),
  //   delete: (slug: any, commentId: any) =>
  //     send("delete", `/articles/${slug}/comments/${commentId}`),
  //   forArticle: (slug: any) =>
  //     send("get", `/articles/${slug}/comments`, undefined, "comments"),
  // };

  // const Profile = {
  //   follow: (username: any) => send("post", `/profiles/${username}/follow`),
  //   get: (username: any) =>
  //     send("get", `/profiles/${username}`, undefined, "profile"),
  //   unfollow: (username: any) => send("delete", `/profiles/${username}/follow`),
  // };

  // return {
  //   Articles,
  //   Auth,
  //   Comments,
  //   Profile,
  //   Tags,
  // };
}
