describe("ShareLink", () => {
  it("link displayed and updated on map change", () => {
    cy.visit("http://localhost:3000");
    cy.get("select").select("2016");
    cy.contains("Share Map");
    cy.get(".share-link-button").click();
    cy.contains("Share Map").should("not.exist");
    cy.contains("http://localhost:3000?map=zvmywzvpzvmzwqzmzzq");
    cy.get("select").select("2012");
    cy.contains("Share Map");
    cy.get(".share-link-button").click();
    cy.contains("http://localhost:3000?map=zvmpwqvmzvmyvqzmwzn");
  });

  it("correct map rendered when data in url", () => {
    cy.visit("http://localhost:3000?map=zvmpwqvmzvmyvqzmwzn");
    cy.contains("Democrats Win");
    cy.get(".dem-bar").should("have.class", "win");
    cy.get(".rep-bar").should("not.have.class", "win");
    cy.get('[data-testid="TX-state"]').should("have.class", "rep-state");
    cy.get('[data-testid="DC-state"]').should("have.class", "dem-state");
  });

  it("default map rendered on incorrect url data", () => {
    cy.visit("http://localhost:3000?map=£££££££££££££££££££");
    cy.contains("Democrats");
    cy.get(".dem-bar").should("not.have.class", "win");
    cy.get(".rep-bar").should("not.have.class", "win");
    cy.get('[data-testid="TX-state"]').should("have.class", "blank-state");
    cy.get('[data-testid="DC-state"]').should("have.class", "blank-state");
  });
});
