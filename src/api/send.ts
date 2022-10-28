import { useCommonStore } from "../store";
import { API_ROOT } from "./const";

export async function send(
  method: string,
  url: string,
  data?: { user?: any; article?: any; comment?: any } | undefined,
  resKey?: string | undefined
) {
  const [{token}]: any = useCommonStore();

  const headers: any = {};
  const opts: any = { method, headers };

  if (data !== undefined) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }

  if (token) headers["Authorization"] = `Token ${token}`;

  try {
    const response = await fetch(API_ROOT + url, opts);
    const json = await response.json();
    console.log("json",json,resKey)
    return resKey ? json[resKey] : json;
  } catch (err: any) {
    if (err && err.response && err.response.status === 401) {
      // actions.logout();
    }
    return err;
  }
}
