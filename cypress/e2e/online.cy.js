// github 在线模式-可能网络比较慢，需要修改
describe("My Blog Test", () => {
  it("Gets, types and asserts", () => {
    cy.visit("https://michael18811380328.github.io/");

    cy.contains("在线小说阅读器").click();

    // Should be on a new URL which
    // includes 'github.io'
    cy.url().should("include", "github.io");

    // Get an button, type into it
    cy.get(".btn-primary").type("test");

    // Verify that the value has been updated
    cy.get(".add-novel-dialog-main").type("test");
  });
});
