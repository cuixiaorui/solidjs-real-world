import { useStore } from "../store";
import { API_ROOT } from "./const";

export async function send(
  method: string,
  url: string,
  data?: { user?: any; article?: any; comment?: any } | undefined,
  resKey?: string | undefined
) {
  const [state]: any = useStore();

  const headers: any = {};
  const opts: any = { method, headers };

  if (data !== undefined) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }

  if (state.token) headers["Authorization"] = `Token ${state.token}`;

  try {
    const response = await fetch(API_ROOT + url, opts);
    const json = await response.json();
    return resKey ? json[resKey] : json;
  } catch (err: any) {
    if (err && err.response && err.response.status === 401) {
      // actions.logout();
    }
    return err;
  }
}
