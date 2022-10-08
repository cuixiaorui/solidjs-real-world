import { createSignal, createContext, useContext } from "solid-js";

const Store = createContext();

export function StoreProvider(props: any) {
  const [store, setStore] = createSignal({
    appName: "cxr-solidjs-real-world",
    currentUser: { username: "cxr" },
  });

  const actions = {};

  return (
    <Store.Provider value={[store, actions]}>{props.children}</Store.Provider>
  );
}

export function useStore() {
  return useContext(Store);
}
