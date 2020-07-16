/// <reference types="cypress" />
describe("Renders App", () => {
  it(`renders form`, () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=eth-checker]").should("exist");
    cy.get("[data-testid=search-field]").should("exist");
  });

  it(`displays error on invalid ethereum address enter`, () => {
    cy.get("[data-testid=field-error]").should("not.exist");
    cy.get("[data-testid=search-field]").type("0xff1f");
    cy.get("[data-testid=field-error]").should("exist");
    cy.get("[data-testid=search-field]").clear();
  });

  it(`enables button when all fields are filled and/or selected`, () => {
    cy.get("[data-testid=search-button]").should("be.disabled");
    cy.get("[data-testid=search-field]").type(
      "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
    );
    cy.get("[data-testid=drop-down]").click();

    cy.get("[data-testid=drop-down-options]").children().first().click();
    cy.get("[data-testid=search-button]").should("be.enabled");
    cy.get("[data-testid=search-field]").clear();
  });

  it(`displays results on type in search field and click search button`, () => {
    cy.get("[data-testid=search-field]").type(
      "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
    );

    cy.get("[data-testid=search-button]").click();
    cy.get("[data-testid=loader]").should("exist");
    cy.wait(2000);

    cy.get("[data-testid=transaction-row]").should(
      "have.length.greaterThan",
      1
    );
  });

  it(`displays qr modal on address click`, () => {
    cy.get("[data-testid=qr-modal]").should("not.exist");
    cy.get("[data-testid=eth-address]").click();
    cy.get("[data-testid=qr-modal]").should("exist");
  });

  it(`closes qr modal on close button click`, () => {
    cy.get("[data-testid=qr-modal]").should("exist");
    cy.get("[data-testid=qr-modal-close]").click();
    cy.get("[data-testid=qr-modal]").should("not.exist");
  });
});
