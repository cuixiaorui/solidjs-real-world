describe("Home", () => {
  it("happy path", () => {
    cy.visit("http://127.0.0.1:3000/");
  });
});

describe("favorite", () => {
  it("to favorite", () => {
    // 访问页面
    // 用户登录
    // token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhZGZzZGFmc2FkIiwidXNlcm5hbWUiOiJzYWRmc2RhZnNhZCIsImlhdCI6MTY2NjcwMTkyOCwiZXhwIjoxNjcxODg1OTI4fQ.c7hyak2fvAdfrvQedbk4uSSQok17O73quWcJRnc8qRw"
    // TODO 需要拦截  2 个接口  一个是登录  一个是点击红心  
    // 找到 红心（红心的状态）
    // 点击
    // 看下 红心（红心的状态）
  });
});
