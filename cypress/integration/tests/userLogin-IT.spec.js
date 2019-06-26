/// <reference types="Cypress" />

describe("Login", () => {
    
    beforeEach(() => {
		cy.visit("/");
    });
  
    it("Not valid user login", () => {

      cy.get('#userName').type("delgadotrueba");
      cy.get('#password').type('password');
      cy.get('#submit').click();
  
      cy.get('.mat-snack-bar-container').should('contain', 'Unauthorized');
    
    });


    it("Valid user login", () => {

        cy.get('#userName').type("admin");
        cy.get('#password').type('admin');
        cy.get('#submit').click();
    
        cy.url().should('include', '/home');

      });

});