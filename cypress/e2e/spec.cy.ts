describe('Renders every component', () => {
  it('Renders App component', () => {
    cy.visit('/');
    cy.getByTestId('wonderland-challenge').should('exist');
  });
});
