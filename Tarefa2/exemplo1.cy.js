/// <reference = cypress>

describe("Teste de criação, registro e login", () => {
  it.skip("Teste de criação de usuário com sucesso", () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Lilyan')
    cy.get('#Text1').type('Oliveira')
    cy.get('#username').type('Lilyan')
    cy.get('#password').type('hello')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')

  })

  it.skip("Teste de criação de usuário com falha", () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Lilyan')
    cy.get('#Text1').type('Oliveira')
    cy.get('#username').type('Lilyan')
    cy.get('.btn-primary').should('be.disabled')

  })
  
  it.skip("Teste de login com sucesso", () => {
    let infos = criarUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', infos[0])

  })

  it("Teste de exclusão de usuário e tentativa de login falha", () => {
    let infos = criarUser()
  
    // Logar o usuário para realizar a exclusão
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
  
    // Verificar se o usuário está logado corretamente
    cy.get('h1.ng-binding').should('contain.text', infos[0])
  
    // Clicar no botão de "Delete" para excluir o usuário
    cy.get('.ng-binding > a').click()
  
    // Verificar se o usuário foi removido da lista (pode mudar o seletor de acordo com a estrutura)
    cy.get('.ng-binding').should('not.contain.text', infos[0])
  
    // Tentar fazer login novamente e deve falhar
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
  
    // Verificar se a mensagem de erro ao fazer login aparece
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')
  })
  
})

function criarUser(){
  let secs = new Date().getSeconds().toString()
  let min = new Date().getMinutes().toString()
  let hours = new Date().getHours().toString() 
  let ID = hours + min + secs + 'ID'
  let Senha = hours + min + secs + 'Senha'
  let infos = [ID, Senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return infos
}