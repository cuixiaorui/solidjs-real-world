import { createSignal, createContext, useContext } from "solid-js";
import { createAgent } from "./createAgent";
import { createStore } from "solid-js/store";
import { createArticles } from "./createArticles";
import { Articles } from "../api";

const Store = createContext();

export async function StoreProvider(props: any) {
  const [state, setState] = createStore({
    token: "",
    appName: "cxr-solidjs-real-world",
    currentUser: { username: "cxr" },
    tags: ["implementations", "app", "a", "b", "c"],
    totalPagesCount: 0,
  });

  const actions = {};
  const store = [state, actions];

  const allArticles = await Articles.all(1);
  console.log("test -------", allArticles);

  // const agent = createAgent(store);
  // createArticles({ agent, setState });

  return (
    <Store.Provider value={[store, actions]}>{props.children}</Store.Provider>
  );
}

export function useStore() {
  return useContext(Store);
}
