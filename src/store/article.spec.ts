import { test, expect, describe, beforeAll, afterEach, afterAll } from "vitest";
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

  test("set favorited when success", async () => {
    let [state]: any = useArticlesStore();
    state.articles = {
      "1234": {
        favorited: false,
        slug: "1234",
      },
    };
    state.makeFavorite("1234");

    expect(state.articles["1234"].favorited).toBe(true);

    let isRequest = false;
    server.use(
      rest.post("https://api.realworld.io/api/articles/1234/favorite", () => {
        isRequest = true;
      })
    );
    await flushPromises();
    expect(isRequest).toBe(true);
    expect(state.articles["1234"].favorited).toBe(true);
  });

  test("set favorited when fail", async () => {
    let [state]: any = useArticlesStore();
    state.articles = {
      "1234": {
        favorited: false,
        slug: "1234",
      },
    };
    state.makeFavorite("1234");

    expect(state.articles["1234"].favorited).toBe(true);

    server.use(
      rest.post(
        "https://api.realworld.io/api/articles/1234/favorite",
        (req, res, ctx) => {
          return res.networkError('Failed to connect')
        }
      )
    );
    await flushPromises();
    expect(state.articles["1234"].favorited).toBe(false);
  });
});
