describe("Map", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Can update map when new year selected", () => {
    cy.contains("US Presidential Election");
    cy.get('[data-testid="FL-state"]').should("have.class", "blank-state");
    cy.get('[data-testid="NV-state"]').should("have.class", "blank-state");
    cy.get("select").select("2016");
    cy.contains("2016 Clinton vs Trump");
    cy.get('[data-testid="FL-state"]').should("have.class", "rep-state");
    cy.get('[data-testid="NV-state"]').should("have.class", "dem-state");
    cy.get("select").select("Predictor");
    cy.contains("2016 Clinton vs Trump").should("not.exist");
    cy.get('[data-testid="FL-state"]').should("have.class", "blank-state");
    cy.get('[data-testid="NV-state"]').should("have.class", "blank-state");
  });

  it("change the votes bar when a state is selected", () => {
    cy.get("select").select("2016");
    cy.contains("Trump Wins");
    cy.get(".dem-bar").should("not.have.class", "win");
    cy.get(".rep-bar").should("have.class", "win");
    cy.get('[data-testid="TX-state"]').click();
    cy.get('[data-testid="TX-state"]').click();
    cy.contains("Clinton Wins");
    cy.contains("Trump Wins").should("not.exist");
    cy.get(".dem-bar").should("have.class", "win");
    cy.get(".rep-bar").should("not.have.class", "win");
  });

  it("renders confetti when a winner and animations selected", () => {
    cy.get("select").select("2016");
    cy.contains("Trump Wins");
    cy.get('[data-testid="animations-toggle"]').click({ force: true });
    cy.get(".confetti-container").should("have.class", "rep-confetti");
    cy.get('[data-testid="animations-toggle"]').click({ force: true });
    cy.get(".confetti-container").should("not.exist");
    cy.get('[data-testid="animations-toggle"]').click({ force: true });
    cy.get(".confetti-container").should("have.class", "rep-confetti");
    cy.get('[data-testid="TX-state"]').click();
    cy.get(".confetti-container").should("not.exist");
  });

  it("updates map when small state selected", () => {
    cy.get("select").select("2016");
    cy.contains(306);
    cy.get('[data-testid="RI-state"]').should("have.class", "dem-state");
    cy.get('[data-testid="RI-state"]').should("not.have.class", "rep-state");
    cy.get("#RI-small-state").should("have.class", "dem-state");
    cy.get("#RI-small-state").should("not.have.class", "rep-state");
    cy.get("#RI-small-state").click();
    cy.contains(310);
    cy.get('[data-testid="RI-state"]').should("not.have.class", "dem-state");
    cy.get('[data-testid="RI-state"]').should("have.class", "rep-state");
    cy.get("#RI-small-state").should("have.class", "rep-state");
    cy.get("#RI-small-state").should("not.have.class", "dem-state");
  });

  it("updates map when district selected", () => {
    cy.get("select").select("2016");
    cy.contains(306);
    cy.get("#NE1-district").click();
    cy.contains(305);
  });
});
