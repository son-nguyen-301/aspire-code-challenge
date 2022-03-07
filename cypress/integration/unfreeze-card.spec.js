describe('Unfreeze a card', () => {
  it('unfreeze card', () => {
    cy.visit('http://localhost:3000/')
    cy.freezeCard()
    cy.unfreezeCard()
  })
})
