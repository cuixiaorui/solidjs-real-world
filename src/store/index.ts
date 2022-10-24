import { createStore } from "solid-js/store";
import { Auth } from "../api";

const [state, setState] = createStore({
  count: 0,
  token: "",
  appName: "cxr-solidjs-real-world",
  currentUser: { username: "cxr" },
  tags: ["implementations", "app", "a", "b", "c"],
  totalPagesCount: 0,
  getAllArticles() {
    console.log("all articles");
  },
  signUp(username: string, email: string, password: string) {
    return Auth.register(username, email, password);
  },
});

export function useStore() {
  return [state, setState];
}
