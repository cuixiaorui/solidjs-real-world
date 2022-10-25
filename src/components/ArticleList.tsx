import { For, Show, Suspense } from "solid-js";
import { useStore } from "../store";
import ArticlePreview from "./ArticlePreview";

// 1. 获取到 props.articles

export default (props) => {
  //   handlePage = (v, e) => {
  //     e.preventDefault();
  //     props.onSetPage(v);
  //     setTimeout(() => window.scrollTo(0, 0), 200);
  //   };

  return (
    <Suspense fallback={<div class="article-preview">Loading articles...</div>}>
      <Content articles={props.articles}></Content>
      {/* <Show when={props.totalPagesCount > 1}>
        <nav>
          <ul class="pagination">
            <For each={[...Array(props.totalPagesCount).keys()]}>
              {v => (
                <li
                  class="page-item"
                  classList={{ active: props.currentPage === v }}
                  onClick={[handlePage, v]}
                >
                  <a class="page-link" href="" textContent={v + 1} />
                </li>
              )}
            </For>
          </ul>
        </nav>
      </Show> */}
    </Suspense>
  );
};

function Content(props) {
  const [{ token, unmakeFavorite, makeFavorite }]: any = useStore();

  function handleClickFavorite([article, slug], e: any) {
    article.favorited ? unmakeFavorite(slug) : makeFavorite(slug);
  }

  return (
    <For
      each={props.articles}
      fallback={<div class="article-preview">No articles are here... yet.</div>}
    >
      {(article: any) => (
        <ArticlePreview
          article={article}
          token={token}
          onClickFavorite={handleClickFavorite}
        />
      )}
    </For>
  );
}
