describe("Tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("tooltip renders on hover", () => {
    cy.contains("California").should("not.exist");
    cy.get('[data-testid="CA-state"]').trigger("mouseover");
    cy.contains("California");
    cy.contains("Texas").should("not.exist");
    cy.get('[data-testid="TX-state"]').trigger("mouseover");
    cy.contains("Texas");
    cy.contains("California").should("not.exist");
  });
});
