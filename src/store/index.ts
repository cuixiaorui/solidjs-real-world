import { createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Auth, Articles, Tags } from "../api";

const [state, setState] = createStore({
  count: 0,
  token: localStorage.getItem("Token") || "",
  articles: {},
  appName: "cxr-solidjs-real-world",
  currentUser: { username: "" },
  get tags() {
    return tags();
  },
  totalPagesCount: 0,
  async unmakeFavorite(slug) {
    const article = state.articles[slug];
    console.log("click _unmakeFavorite");
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
    console.log("click _makeFavorite", article);
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

  getAllArticles(tabs: string | undefined) {
    // 1. tabs name
    // 2. 发送请求
    console.log("all articles");
    // const [articleSource, setArticleSource] = createSignal();
    // const [articles] = createResource(
    //   articleSource,
    //   (args, { value }) => {
    //     console.log(args, value);
    //   },
    //   {
    //     initialValue: {
    //       name:"solidjs"
    //     },
    //   }
    // );
    Articles.get("").then((data) => {
      const articles = data.reduce((memo, article) => {
        memo[article.slug] = article;
        return memo;
      }, {});
      setState({ articles });

      // console.log(data);
      // setState({ articles: data });
      // return articles.reduce((memo, article) => {
      //   memo[article.slug] = article;
      //   return memo;
      // }, {});
      // return data;
    });
  },
  getAriclesByTag() {
    console.log("getAriclesByTag")
    const [tag, setTag] = createSignal("est");
    window.tag = tag;
    window.setTag = setTag;
    const [articles] = createResource(tag, (arg) => Articles.byTag(arg, 0), {
      initialValue: [],
    });
    return articles;
  },
  async signUp(username: string, email: string, password: string) {
    const { user } = await Auth.register(username, email, password);
    localStorage.setItem("Token", user.token);
    setState({ currentUser: { username: user.username }, token: user.token });
  },
});

let tags;
async function createTags() {
  [tags] = createResource(
    () => Tags.getAll().then((tags) => tags.map((t) => t.toLowerCase())),
    { initialValue: [] }
  );
}

createTags();

export function useStore() {
  return [state, setState];
}
