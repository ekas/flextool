/// <reference types="cypress" />

describe("FlexTool Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should display Login Form inputs", () => {
    cy.contains("Welcome").should("exist");
    cy.get(".loginSubHeading")
      .should("exist")
      .contains("Need to create a new acount? Sign up here.");

    cy.get(".loginFormBtnGoogle > :nth-child(3)").contains(
      "Sign in with Google"
    );
    cy.get("#flextool_login_email").should("exist");
    cy.get("#flextool_login_password").should("exist");
    cy.get(".loginFormBtn").contains("Sign In");
  });

  it("Should Login and redirect to Page List Screen for Operator Role User", () => {
    cy.get("#flextool_login_email").type("ekaspreet93.singh@gmail.com");
    cy.get("#flextool_login_password").type("secretEkas32");
    cy.get(".loginFormBtn").contains("Sign In").click();
    cy.wait(7000);
    cy.location("pathname").should("eq", "/pages");
    cy.get(".creatNewBtn").should("not.exist");
    cy.get(".menuPerPage").should("have.length", 0);
    cy.get(".pageListItem").should("have.length", 2);
  });

  it("Should Login and redirect to Page List Screen for Developer Role User", () => {
    cy.get("#flextool_login_email").type("bile.simpson@gmail.com");
    cy.get("#flextool_login_password").type("secretBile32");
    cy.get(".loginFormBtn").contains("Sign In").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/pages");
    cy.get(".creatNewBtn").should("exist");
    cy.get(".creatNewBtn").contains("Create New Page");
    cy.get(".menuPerPage").should("have.length", 3);
    cy.get(".pageListItem").should("have.length", 3);
  });

  it("Should Login and logout", () => {
    cy.get("#flextool_login_email").type("bile.simpson@gmail.com");
    cy.get("#flextool_login_password").type("secretBile32");
    cy.get(".loginFormBtn").contains("Sign In").click();
    cy.wait(4000);
    cy.location("pathname").should("eq", "/pages");
    cy.get(".menuItemPages").should("exist").contains("Pages");
    cy.get(".menuAvatarAnchor").should("exist").trigger("mouseover");
    cy.get(".logoutBtn").should("exist").click();
    cy.location("pathname").should("eq", "/");
  });
});
