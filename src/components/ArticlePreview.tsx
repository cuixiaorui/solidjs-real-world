import { NavLink } from "./NavLink";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

export default ({ article, token, onClickFavorite }) => {
  return (
    <div class="article-preview">
      <Meta
        token={token}
        article={article}
        onClickFavorite={onClickFavorite}
      ></Meta>
      <Preview article={article}></Preview>
    </div>
  );
};

function Meta({ article, token, onClickFavorite }) {
  const { author } = article;
  return (
    <div class="article-meta">
      <NavLink href={`@${author.username}`} route="profile">
        <img src={author.image} alt="" />
      </NavLink>

      <div class="info">
        <NavLink class="author" href={`@${author.username}`} route="profile">
          {author.username}
        </NavLink>
        <span
          class="date"
          textContent={/*@once*/ new Date(article.createdAt).toDateString()}
        />
      </div>

      {token && (
        <FavoritesCount
          article={article}
          onClickFavorite={onClickFavorite}
        ></FavoritesCount>
      )}
    </div>
  );
}

function Preview({ article }) {
  const { title, description, slug, tagList } = article;

  return (
    <NavLink href={`article/${slug}`} route="article" class="preview-link">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Read more...</span>
      <TagList tagList={tagList}></TagList>
    </NavLink>
  );
}

function TagList(props) {
  return (
    <ul class="tag-list">
      {
        /*@once*/
        props.tagList.map((tag) => (
          <li class="tag-default tag-pill tag-outline" textContent={tag} />
        ))
      }
    </ul>
  );
}

function FavoritesCount(props) {
  return (
    <div class="pull-xs-right">
      <button
        class={props.article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
        onClick={[props.onClickFavorite, [props.article, props.article.slug]]}
      >
        <i class="ion-heart" /> {props.article.favoritesCount}
      </button>
    </div>
  );
}
