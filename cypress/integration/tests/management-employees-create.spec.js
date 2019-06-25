/// <reference types="Cypress" />

describe("Login", () => {
    
    beforeEach(() => {
        // Start server to listen to routes.
        cy.server();

        // Intercept HTTP request
        cy.route( 
          {
            method: 'GET',
            url: 'http://localhost:8080/api/v0/employees',
            status: 200,
            response: []
          }
        )
        .as('TOKEN'); 

        cy.visit("/welcome/login");

        cy.get('#userName').type("admin");
        cy.get('#password').type('admin');
        cy.get('#submit').click();
    
        cy.url().should('include', '/home');
    });
  
    it("CREATE - Employee", () => {

      cy.get('.mat-header-row > .cdk-column-actions > .mat-button > .mat-button-wrapper > .mat-icon').click();
  
      cy.get('#firstName').type("Jose Manuel");
      cy.get('#lastName').type("Delgado Trueba");
      cy.get('#email').type("cd@gmail.com");    

      cy.get('.mat-raised-button').click();

      cy.get('mat-table').find("mat-cell").contains("Jose Manuel").parent().as("field");

      cy.get("@field").should('contain', 'Jose Manuel');
      cy.get("@field").should('contain', 'Delgado Trueba');
      cy.get("@field").find("mat-cell").should('contain', 'cd@gmail.com');

    });



});