import ArticleList from "../components/ArticleList";
import {
  createMemo,
  For,
  Show,
  Suspense,
  lazy,
  createResource,
  onMount,
  createEffect,
} from "solid-js";
import { NavLink } from "../components/NavLink";
import { useSearchParams, useLocation, useParams } from "@solidjs/router";
import { Tags as TagsApi } from "../api";

import { useStore } from "../store";

function useData() {
  const [store]: any = useStore();

  const data = store.getAllArticles();

  const location = useLocation();
  console.log(location, "-----");

  return {
    handleSetPage() {},
    tab: () => {
      // const [searchParams] = useSearchParams();
      // return searchParams.tab;
      const token = "2134";
      const search = location.search.split("?")[1];
      if (!search) return token ? "feed" : "all";

      const query = new URLSearchParams(search);
      const result = query.get("tab");
      console.log(result);
      return result;
    },
    store,
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
  const [state]: any = useStore();
  const { handleSetPage, tab, store } = useData();

  const [searchParams] = useSearchParams();

  const getData = state.getAriclesByTag();
  createEffect(() => {
    console.log(getData(), "--1-1-");
    console.log(searchParams.tab);
  });

  return (
    <div class="home-page">
      <Banner appName={state.appName}></Banner>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <FeedToggle token={state.token}></FeedToggle>
            <ArticleList
              articles={Object.values(store.articles)}
              // totalPagesCount={store.totalPagesCount}
              // currentPage={store.page}
              // onSetPage={handleSetPage}
            />
          </div>

          <div class="col-md-3">
            <Tags tags={state.tags}></Tags>
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
