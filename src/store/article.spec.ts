import {
  test,
  it,
  expect,
  describe,
  vi,
} from "vitest";
import { useArticlesStore } from "./articles";
import flushPromises from "flush-promises";
import { rest } from "msw";

describe("Article store", () => {
  test("should get all Articles when tag is empty", async () => {
    server.use(
      rest.get("https://api.realworld.io/api/articles", (req, res, ctx) => {
        return res(ctx.json({ articles: [{ slug: "1234", title: "111" }] }));
      })
    );
    let [state]: any = useArticlesStore();
    state.getAriclesByTag();
    await flushPromises();
    expect(state.articles).toEqual({ "1234": { slug: "1234", title: "111" } });
  });

  test("should get welcome articles when tag is welcom", async () => {
    let request;
    server.use(
      rest.get("https://api.realworld.io/api/articles", (req, res, ctx) => {
        request = req;
        return res(ctx.json({ articles: [{ slug: "1234", title: "111" }] }));
      })
    );
    let [state]: any = useArticlesStore();
    state.getAriclesByTag("welcome");
    await flushPromises();

    const {
      url: { searchParams },
    } = request;

    expect(searchParams.get("tag")).toBe("welcome");
    expect(state.articles).toEqual({ "1234": { slug: "1234", title: "111" } });
  });
  test("should get articles by page", async () => {
    let request;
    server.use(
      rest.get("https://api.realworld.io/api/articles", (req, res, ctx) => {
        request = req;
        return res(ctx.json({ articles: [{ slug: "1234", title: "111" }] }));
      })
    );
    let [state]: any = useArticlesStore();
    state.handleSetPage(0);
    await flushPromises();

    const {
      url: { searchParams },
    } = request;
    expect(searchParams.get("offset")).toBe("0");
    expect(state.articles).toEqual({ "1234": { slug: "1234", title: "111" } });
  });

  describe("make favorited", () => {
    let state;
    let article;
    function setup() {
      [state] = useArticlesStore();
      article = {
        favorited: false,
        slug: "1234",
        favoritesCount: 0,
      };
      state.articles = {
        [article.slug]: article,
      };
    }
    test("set favorited when success", async () => {
      // given -> 准备数据
      setup();
      const fn = vi.fn();
      server.use(
        rest.post("https://api.realworld.io/api/articles/1234/favorite", fn)
      );

      // when -> 触发测试动作
      state.makeFavorite(article.slug);

      // then -> 验证结果
      expect(state.articles[article.slug].favorited).toBe(true);
      expect(state.articles[article.slug].favoritesCount).toBe(1);

      await flushPromises();
      expect(fn).toBeCalled();
      expect(state.articles[article.slug].favorited).toBe(true);
      expect(state.articles[article.slug].favoritesCount).toBe(1);
    });

    test("set favorited when fail", async () => {
      setup();
      server.use(
        rest.post(
          "https://api.realworld.io/api/articles/1234/favorite",
          (req, res, ctx) => {
            return res.networkError("Failed to connect");
          }
        )
      );

      state.makeFavorite(article.slug);

      expect(state.articles[article.slug].favorited).toBe(true);
      expect(state.articles[article.slug].favoritesCount).toBe(1);

      await flushPromises();
      expect(state.articles[article.slug].favorited).toBe(false);
      expect(state.articles[article.slug].favoritesCount).toBe(0);
    });
  });

  describe("unmakeFavorite", () => {
    let state;
    let article;
    function setup() {
      [state] = useArticlesStore();
      article = {
        favorited: true,
        slug: "1234",
        favoritesCount: 1,
      };
      state.articles = {
        [article.slug]: article,
      };
    }
    it("success", async () => {
      setup();
      // 拦截请求
      let fn = vi.fn();
      server.use(
        rest.delete("https://api.realworld.io/api/articles/1234/favorite", fn)
      );

      state.unmakeFavorite(article.slug);

      expect(state.articles[article.slug].favorited).toBe(false);
      expect(state.articles[article.slug].favoritesCount).toBe(0);
      await flushPromises();
      expect(fn).toBeCalled();
      expect(state.articles[article.slug].favorited).toBe(false);
      expect(state.articles[article.slug].favoritesCount).toBe(0);
    });

    it("fail", async () => {
      setup();
      server.use(
        rest.delete(
          "https://api.realworld.io/api/articles/1234/favorite",
          (req, res, ctx) => {
            return res.networkError("Failed to connect");
          }
        )
      );

      state.unmakeFavorite(article.slug);

      expect(state.articles[article.slug].favorited).toBe(false);
      expect(state.articles[article.slug].favoritesCount).toBe(0);
      await flushPromises();
      expect(state.articles[article.slug].favorited).toBe(true);
      expect(state.articles[article.slug].favoritesCount).toBe(1);
    });
  });
});
