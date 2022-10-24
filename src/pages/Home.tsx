// import NavLink from "../../components/NavLink";
// import ArticleList from "../../components/ArticleList";
import { createMemo, For, Show, Suspense } from "solid-js";
import { NavLink } from "../components/NavLink";
// import { useStore } from "../store";
import { useSearchParams, useLocation } from "@solidjs/router";

import { useStore } from "../store";

// { appName, token, handleSetPage, tab, store }

// function useData() {
//   const [store]: any = useStore();

//   return {
//     handleSetPage() {},
//     tab: () => {
//       const [searchParams] = useSearchParams();
//       return searchParams.tab;
//     },
//     store,
//   };

//   // const [store, { loadArticles, setPage }] = useStore(),
//   //   { token, appName } = store,
//   //   { location } = useRouter(),
//   //   tab = createMemo(() => {
//   //     const search = location().split("?")[1];
//   //     if (!search) return token ? "feed" : "all";
//   //     const query = new URLSearchParams(search);
//   //     return query.get("tab");
//   //   }),
//   //   [, start] = useTransition(),
//   //   getPredicate = () => {
//   //     switch (tab()) {
//   //       case "feed":
//   //         return { myFeed: true };
//   //       case "all":
//   //         return {};
//   //       case undefined:
//   //         return undefined;
//   //       default:
//   //         return { tag: tab() };
//   //     }
//   //   },
//   //   handleSetPage = (page) => {
//   //     start(() => {
//   //       setPage(page);
//   //       loadArticles(getPredicate());
//   //     });
//   //   };
//   // createComputed(() => loadArticles(getPredicate()));
// }

export const Home = () => {
  const [state]:any = useStore();
  state.getAllArticles()
  console.log(state)
  // const { handleSetPage, tab, store } = useData();
  return (
    <div>
      home
      {/* home : count :{state.count} */}
      {/* <button onclick={() => state.setCount()}>click</button> */}
    </div>
  );
  // return (
  //   <div class="home-page">
  //     <Banner></Banner>

  //     <div class="container page">
  //       <div class="row">
  //         <div class="col-md-9">
  //           <div class="feed-toggle">
  //             <ul class="nav nav-pills outline-active">
  //               {store.token && (
  //                 <li class="nav-item">
  //                   <NavLink
  //                     class="nav-link"
  //                     href="?tab=feed"
  //                     active={tab() === "feed"}
  //                   >
  //                     Your Feed
  //                   </NavLink>
  //                 </li>
  //               )}
  //               <li class="nav-item">
  //                 <NavLink
  //                   class="nav-link"
  //                   href="?tab=all"
  //                   active={tab() === "all"}
  //                 >
  //                   Global Feed
  //                 </NavLink>
  //               </li>
  //               <Show when={tab() !== "all" && tab() !== "feed"}>
  //                 <li class="nav-item">
  //                   <a href="" class="nav-link active">
  //                     <i class="ion-pound" /> {tab()}
  //                   </a>
  //                 </li>
  //               </Show>
  //             </ul>
  //           </div>

  //           {/* <ArticleList
  //             articles={Object.values(store.articles)}
  //             totalPagesCount={store.totalPagesCount}
  //             currentPage={store.page}
  //             onSetPage={handleSetPage}
  //           /> */}
  //         </div>

  //         <div class="col-md-3">
  //           <div class="sidebar">
  //             <p>Popular Tags</p>
  //             <Suspense fallback="Loading tags...">
  //               <div class="tag-list">
  //                 <For each={store.tags}>
  //                   {(tag: any) => (
  //                     <a href={`#/?tab=${tag}`} class="tag-pill tag-default">
  //                       {tag}
  //                     </a>
  //                   )}
  //                 </For>
  //               </div>
  //             </Suspense>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

// function Banner() {
//   const { store } = useData();

//   return (
//     <div class="banner">
//       <div class="container">
//         <h1 class="logo-font" textContent={store.appName} />
//         <p>A place to share your knowledge.</p>
//       </div>
//     </div>
//   );
// }
