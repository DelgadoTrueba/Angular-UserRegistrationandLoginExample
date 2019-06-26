/// <reference types="Cypress" />

describe("Management Employees - CREATE", () => {
    
    beforeEach(() => {    
        // Start server to listen to routes.
        cy.server();

        cy.route( 
            {
              method: 'POST',
              url:  Cypress.env("apiUrl") + '/employees',
            }
          )
        .as('CREATE_REQUEST');

        cy.route( 
          {
            method: 'POST',
            url:  Cypress.env("apiUrl") + '/users/token',
          }
        )
      .as('TOKEN_REQUEST');

		    cy.visit("/");

        cy.get('#userName').type("admin");
        cy.get('#password').type('admin');
        cy.get('#submit').click();
    
        cy.wait("@TOKEN_REQUEST");
        cy.url().should('include', '/home');
    });
  
    it("CREATE - Employee", () => {

      cy.get('.mat-header-row > .cdk-column-actions > .mat-button > .mat-button-wrapper > .mat-icon').click();
  
      cy.get('#firstName').type("NewEmployee");
      cy.get('#lastName').type("NewEmployee");
      cy.get('#email').type("NewEmployee@gmail.com");    

      cy.get('.mat-raised-button').click();

      cy.wait("@CREATE_REQUEST");
      cy.get('mat-table').find("mat-cell").contains("NewEmployee").parent().as("field");

      cy.get("@field").should('contain', 'NewEmployee');
      cy.get("@field").should('contain', 'NewEmployee');
      cy.get("@field").find("mat-cell").should('contain', 'NewEmployee@gmail.com');

    });



});