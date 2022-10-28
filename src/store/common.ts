import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { Tags,Auth } from "../api";

export function useCommonStore() {
  return [state, setState];
}
const [state, setState] = createStore({
  count: 0,
  token: localStorage.getItem("Token") || "",
  appName: "cxr-solidjs-real-world",
  currentUser: { username: "" },
  get tags() {
    return tags();
  },
  totalPagesCount: 0,
  async signUp(username: string, email: string, password: string) {
    const { user } = await Auth.register(username, email, password);
    localStorage.setItem("Token", user.token);
    setState({ currentUser: { username: user.username }, token: user.token });
  },
});

let tags;
async function createTags() {
  [tags] = createResource(
    () => Tags.getAll().then((tags) => tags.map((t) => t.toLowerCase())),
    { initialValue: [] }
  );
}

createTags();
