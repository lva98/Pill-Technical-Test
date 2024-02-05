describe('Product Page', () => {
  it('Renders error when loaded withouth URL', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-testid="cypress-product-error"]')
      .should('exist')
      .should('have.text', 'URL inválida')
  })

  it('Renders a valid product', () => {
    cy.visit('http://localhost:5173?url=https://www.drogasil.com.br/huggies-fralda-supreme-care-unissex-hiper-xxg-58-unidades.html')
    cy.get('[data-testid="cypress-product-details-name"]').should('exist').should('not.be.undefined')
    cy.get('[data-testid="cypress-product-details-barcode"]').should('exist').should('not.be.undefined')
    cy.get('[data-testid="cypress-product-details-brand"]').should('exist').should('not.be.undefined')
    cy.get('[data-testid="cypress-product-details-price"]').should('exist').should('not.be.undefined')
  })

  it('Renders product not found', () => {
    cy.visit('http://localhost:5173?url=https://www.drogasil.com.br/leonardo.html')
    cy.get('[data-testid="cypress-product-loading"]').should('exist')
    cy.get('[data-testid="cypress-product-loading"]', { timeout: 60e3 }).should('not.exist')
    cy.get('[data-testid="cypress-product-error"]')
      .should('exist')
      .should('have.text', 'Produto não encontrado')
  })
})