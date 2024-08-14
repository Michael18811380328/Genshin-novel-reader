// local 离线模式
describe("The Home Page", () => {
  it("successfully loads", () => {
    // TODO: local 3000 is changed
    cy.visit("http://localhost:3002/novel-demo"); // change URL to match your dev URL

    // cy.contains("在线小说阅读器").click();

    // Should be on a new URL which
    cy.url().should("include", "localhost");

    // Get an button, type into it
    // 这里可能有多个按钮，测试不通过
    cy.get(".icon-search").type("芭芭拉");

    // // Verify that the value has been updated
    // cy.get(".add-novel-dialog-main").type("test");
  });
});

// 本地服务器模式

// describe('The Login Page', () => {
//   beforeEach(() => {
//     // reset and seed the database prior to every test
//     cy.exec('npm run db:reset && npm run db:seed')

//     // seed a user in the DB that we can control from our tests
//     // assuming it generates a random password for us
//     cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
//       .its('body')
//       .as('currentUser')
//   })

//   it('sets auth cookie when logging in via form submission', function () {
//     // destructuring assignment of the this.currentUser object
//     const { username, password } = this.currentUser

//     cy.visit('/login')

//     cy.get('input[name=username]').type(username)

//     // {enter} causes the form to submit
//     cy.get('input[name=password]').type(`${password}{enter}`)

//     // we should be redirected to /dashboard
//     cy.url().should('include', '/dashboard')

//     // our auth cookie should be present
//     cy.getCookie('your-session-cookie').should('exist')

//     // UI should reflect this user being logged in
//     cy.get('h1').should('contain', 'jane.lane')
//   })
// })
