import { test, expect } from "vitest";
import {useArticlesStore} from './articles'
test("add", () => {
  expect(1 + 1).toBe(2);
});

test('article',()=>{
  let [state]:any = useArticlesStore()
  expect(state.page).toBe(0);
})

