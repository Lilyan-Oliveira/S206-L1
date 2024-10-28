describe("Testes no site The Internet", () => {

  // Caso 1: Login com sucesso
  it("Deve fazer login com credenciais válidas", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get("button[type='submit']").click();
    cy.contains("You logged into a secure area!").should("be.visible");
  });

  // Caso 2: Login com falha (caso negativo)
  it("Deve exibir erro para login inválido", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("usuarioInvalido");
    cy.get("#password").type("senhaInvalida");
    cy.get("button[type='submit']").click();
    cy.contains("Your username is invalid!").should("be.visible");
  });

  // Caso 3: Login sem preencher os campos
  it("Deve exibir erro ao tentar login sem preencher os campos", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("button[type='submit']").click();
    cy.contains("Your username is invalid!").should("be.visible");
  });

  // Caso 4: Logout após login bem-sucedido
  it("Deve fazer logout após login bem-sucedido", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get("button[type='submit']").click();
    cy.contains("You logged into a secure area!").should("be.visible");
    cy.get(".icon-2x.icon-signout").click();
    cy.contains("You logged out of the secure area!").should("be.visible");
  });

  // Caso 5: Interação com alertas
  it("Deve exibir e confirmar alerta JS", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    cy.contains("Click for JS Alert").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("I am a JS Alert");
    });
    cy.contains("You successfully clicked an alert").should("be.visible");
  });

  // Caso 6: Manipulação de frames
  it("Deve acessar o conteúdo do frame", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");
    cy.get("#mce_0_ifr").then(($iframe) => {
      const iframeBody = $iframe.contents().find("body");
      cy.wrap(iframeBody).find("p").should("contain.text", "Your content goes here.");
    });
  });

});
