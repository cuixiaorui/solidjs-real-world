const generateSignUpInfo = () => {
  const randomIndex = Math.floor(Math.random() * 1000000);

  return {
    username: "cuixiaorui" + randomIndex,
    email: "cuixiaorui" + randomIndex,
    password: "cuixiaorui" + randomIndex,
  };
};
describe("SignUp", () => {
  // it("happy path", () => {
  //   // request
  //   cy.intercept({
  //     method: "POST",
  //     url: "https://api.realworld.io/api/users",
  //   }).as("apiGetUsers");

  //   // signUp
  //   cy.visit("http://127.0.0.1:3000/register");
  //   const { username, email, password } = generateSignUpInfo();
  //   cy.get("#username").type(username);
  //   cy.get("#email").type(email);
  //   cy.get("#password").type(password);
  //   cy.contains("Sign up").click();

  //   cy.wait("@apiGetUsers").should(({ request }) => {
  //     expect(request.body.user.username).to.equal(username);
  //     expect(request.body.user.email).to.equal(email);
  //     expect(request.body.user.password).to.equal(password);
  //   });

  //   // 点击登录按钮之后 成功登录的话 跳转到 home 页面
  //   cy.window().then((win) => {
  //     // 验证 location 改变
  //     expect(win.location.href).to.equal("http://127.0.0.1:3000/");
  //   });
  // });

  it("happy path", () => {
    cy.intercept({
      method: "POST",
      url: "https://api.realworld.io/api/users",
    }).as("apiGetUsers");

    cy.visit("http://127.0.0.1:3000/");

    cy.contains("Sign up").click();

    const { username, email, password } = generateSignUpInfo();
    cy.get("#username").type(username);
    cy.get("#email").type(email);
    cy.get("#password").type(password);

    cy.get("#signUpBtn").click();

    cy.wait("@apiGetUsers");
    cy.contains(username);
  });
});
