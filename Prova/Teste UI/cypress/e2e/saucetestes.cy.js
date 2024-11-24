/// <reference types="cypress" />

describe('Testes no site SauceDemo', () => {
  const validUser = { username: 'standard_user', password: 'secret_sauce' };
  const invalidUser = { username: 'wrong_user', password: 'wrong_password' };

  beforeEach(() => {
    cy.request('https://www.saucedemo.com/') // Verifica se o site está acessível
      .its('status')
      .should('eq', 200); // Continua apenas se o status for 200
    cy.visit('/'); // Visita a URL base
  });
  

  it('Não deve realizar login com credenciais inválidas', () => {
    cy.visit('https://www.saucedemo.com/'); // Acessa o site diretamente no teste
  
    // Continua com os passos do teste
    cy.get('[data-test="username"]').type('wrong_user');
    cy.get('[data-test="password"]').type('wrong_password');
    cy.get('[data-test="login-button"]').click();
  
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('Deve realizar login com credenciais válidas', () => {
    cy.get('[data-test="username"]').type(validUser.username); // Nome de usuário
    cy.get('[data-test="password"]').type(validUser.password); // Senha
    cy.get('[data-test="login-button"]').click(); // Botão de login

    cy.url().should('include', '/inventory.html'); // Verifica URL
    cy.get('.title').should('contain', 'Products'); // Verifica título
  });

  it('Deve adicionar um item ao carrinho', () => {
    cy.get('[data-test="username"]').type(validUser.username);
    cy.get('[data-test="password"]').type(validUser.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // Adiciona ao carrinho
    cy.get('.shopping_cart_badge').should('contain', '1'); // Verifica carrinho
  });
  
});
