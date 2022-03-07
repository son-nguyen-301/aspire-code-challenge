// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('freezeCard', () => {
  const freezeButton = cy.get('[data-cy=freeze-card-button]')
  freezeButton.click()
  cy.get('[data-cy=confirm-freeze-card-btn]').click()
  cy.get('[data-cy=unfreeze-card-button]').should('be.visible')
})

Cypress.Commands.add('unfreezeCard', () => {
  const unfreezeButton = cy.get('[data-cy=unfreeze-card-button]')
  unfreezeButton.click()
  cy.get('[data-cy=confirm-unfreeze-card-btn]').click()
  cy.get('[data-cy=freeze-card-button]').should('be.visible')
})
