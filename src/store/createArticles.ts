import { createResource, createSignal } from "solid-js";
const LIMIT = 10;

export function createArticles({ agent, actions, state, setState }: any) {
  const [articleSource, setArticleSource] = createSignal();
  console.log("create articles");
  const [articles] = createResource(
    articleSource,
    (args: any, { value }: any) => {
      if (args[0] === "articles") {
        return $req(args[1]).then(({ articles, articlesCount }: any) => {
          queueMicrotask(() =>
            setState({ totalPagesCount: Math.ceil(articlesCount / LIMIT) })
          );
          return articles.reduce((memo, article) => {
            memo[article.slug] = article;
            return memo;
          }, {});
        });
      }
      const article = state.articles[args[1]];
      if (article) return value;
      return agent.Articles.get(args[1]).then((article) => ({
        ...value,
        [args[1]]: article,
      }));
    },
    { initialValue: { name: "heiheihei" } }
  );



  function $req(predicate) {
    // if (predicate.myFeed) return agent.Articles.feed(state.page, LIMIT);
    if (predicate.myFeed) return agent.Articles.all();
    if (predicate.favoritedBy)
      return agent.Articles.favoritedBy(
        predicate.favoritedBy,
        state.page,
        LIMIT
      );
    if (predicate.tag)
      return agent.Articles.byTag(predicate.tag, state.page, LIMIT);
    if (predicate.author)
      return agent.Articles.byAuthor(predicate.author, state.page, LIMIT);
    return agent.Articles.all(state.page, LIMIT, predicate);
  }

  // Object.assign(actions, {
  //   setPage: (page) => setState({ page }),
  //   loadArticles(predicate) {
  //     setArticleSource(["articles", predicate]);
  //   },
  //   loadArticle(slug) {
  //     setArticleSource(["article", slug]);
  //   },
  //   async makeFavorite(slug) {
  //     const article = state.articles[slug];
  //     if (article && !article.favorited) {
  //       setState("articles", slug, (s:any) => ({
  //         favorited: true,
  //         favoritesCount: s.favoritesCount + 1,
  //       }));
  //       try {
  //         await agent.Articles.favorite(slug);
  //       } catch (err) {
  //         setState("articles", slug, (s:any) => ({
  //           favorited: false,
  //           favoritesCount: s.favoritesCount - 1,
  //         }));
  //         throw err;
  //       }
  //     }
  //   },
  //   async unmakeFavorite(slug:any) {
  //     const article = state.articles[slug];
  //     if (article && article.favorited) {
  //       setState("articles", slug, (s:any) => ({
  //         favorited: false,
  //         favoritesCount: s.favoritesCount - 1,
  //       }));
  //       try {
  //         await agent.Articles.unfavorite(slug);
  //       } catch (err) {
  //         setState("articles", slug, (s:any) => ({
  //           favorited: true,
  //           favoritesCount: s.favoritesCount + 1,
  //         }));
  //         throw err;
  //       }
  //     }
  //   },
  //   async createArticle(newArticle:any) {
  //     const { article, errors } = await agent.Articles.create(newArticle);
  //     if (errors) throw errors;
  //     setState("articles", { [article.slug]: article });
  //     return article;
  //   },
  //   async updateArticle(data:any) {
  //     const { article, errors } = await agent.Articles.update(data);
  //     if (errors) throw errors;
  //     setState("articles", { [article.slug]: article });
  //     return article;
  //   },
  //   async deleteArticle(slug:any) {
  //     const article = state.articles[slug];
  //     setState("articles", { [slug]: undefined });
  //     try {
  //       await agent.Articles.del(slug);
  //     } catch (err) {
  //       setState("articles", { [slug]: article });
  //       throw err;
  //     }
  //   },
  // });
  // return articles;
}
