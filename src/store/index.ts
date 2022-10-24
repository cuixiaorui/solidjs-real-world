import { createStore } from "solid-js/store";
import { Auth } from "../api";

const [state, setState] = createStore({
  count: 0,
  token: "",
  appName: "cxr-solidjs-real-world",
  currentUser: { username: "" },
  tags: ["implementations", "app", "a", "b", "c"],
  totalPagesCount: 0,
  getAllArticles() {
    console.log("all articles");
  },
  async signUp(username: string, email: string, password: string) {
    const { user } = await Auth.register(username, email, password);
    setState({ currentUser: { username: user.username }, token: user.token });
  },
});

export function useStore() {
  return [state, setState];
}
