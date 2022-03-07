describe('Freeze a card', () => {
  it('Freeze card', () => {
    cy.visit('http://localhost:3000/')
    cy.freezeCard()
  })
})
