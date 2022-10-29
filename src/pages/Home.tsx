import ArticleList from "../components/ArticleList";
import { For, Show, Suspense, createEffect } from "solid-js";
import { NavLink } from "../components/NavLink";
import { useSearchParams, useLocation } from "@solidjs/router";
import { useArticlesStore, useCommonStore } from "../store";

function useData() {
  const [commonState]: any = useCommonStore();
  const location = useLocation();

  return {
    handleSetPage() {},
    tab: () => {
      // todo 需要确认一下是不是还需要
      const token = "2134";
      const search = location.search.split("?")[1];
      if (!search) return token ? "feed" : "all";

      const query = new URLSearchParams(search);
      const result = query.get("tab");
      console.log(result);
      return result;
    },
    state: commonState,
  };

  // const [store, { loadArticles, setPage }] = useStore(),
  //   { token, appName } = store,
  //   { location } = useRouter(),
  //   tab = createMemo(() => {
  //     const search = location().split("?")[1];
  //     if (!search) return token ? "feed" : "all";
  //     const query = new URLSearchParams(search);
  //     return query.get("tab");
  //   }),
  //   [, start] = useTransition(),
  //   getPredicate = () => {
  //     switch (tab()) {
  //       case "feed":
  //         return { myFeed: true };
  //       case "all":
  //         return {};
  //       case undefined:
  //         return undefined;
  //       default:
  //         return { tag: tab() };
  //     }
  //   },
  //   handleSetPage = (page) => {
  //     start(() => {
  //       setPage(page);
  //       loadArticles(getPredicate());
  //     });
  //   };
  // createComputed(() => loadArticles(getPredicate()));
}

export const Home = () => {
  const [commonState]: any = useCommonStore();
  const [articlesState]: any = useArticlesStore();
  const [searchParams] = useSearchParams();

  commonState.setup()

  createEffect(() => {
    articlesState.getAriclesByTag(searchParams.tab);
  });

  return (
    <div class="home-page">
      <Banner appName={commonState.appName}></Banner>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <FeedToggle token={commonState.token}></FeedToggle>
            <ArticleList
              articles={Object.values(articlesState.articles)}
              totalPagesCount={articlesState.totalPagesCount}
              currentPage={articlesState.page}
              onSetPage={articlesState.handleSetPage}
            />
          </div>

          <div class="col-md-3">
            <Tags tags={commonState.tags}></Tags>
          </div>
        </div>
      </div>
    </div>
  );
};

function FeedToggle(props) {
  const tab = () => {
    const [searchParams] = useSearchParams();
    return searchParams.tab;
  };

  return (
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        {props.token && (
          <li class="nav-item">
            <NavLink
              class="nav-link"
              href="?tab=feed"
              active={tab() === "feed"}
            >
              Your Feed
            </NavLink>
          </li>
        )}
        <li class="nav-item">
          <NavLink class="nav-link" href="?tab=all" active={tab() === "all"}>
            Global Feed
          </NavLink>
        </li>
        <Show when={tab() !== "all" && tab() !== "feed"}>
          <li class="nav-item">
            <a href="" class="nav-link active">
              <i class="ion-pound" /> {tab()}
            </a>
          </li>
        </Show>
      </ul>
    </div>
  );
}

function Tags(props) {
  return (
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        <Suspense fallback="Loading tags...">
          <For each={props.tags}>
            {(tag: any) => (
              <a href={`#/?tab=${tag}`} class="tag-pill tag-default">
                {tag}
              </a>
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}

function Banner(props) {
  return (
    <div class="banner">
      <div class="container">
        <h1 class="logo-font" textContent={props.appName} />
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
}
