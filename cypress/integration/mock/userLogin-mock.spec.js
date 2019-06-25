/// <reference types="Cypress" />

describe("Login", () => {
    
    beforeEach(() => {

      // Start server to listen to routes.
      cy.server();
        
      cy.visit("/welcome/login");

    });
  
    it("Not valid user login", () => {

      cy.route( 
        {
          method: 'POST',
          url: 'http://localhost:8080/api/v0/users/token',
          status: 401,
        }
      )
      .as('TOKEN'); 


      cy.get('#userName').type("delgadotrueba");
      cy.get('#password').type('password');
      cy.get('#submit').click();
  
      cy.get('.mat-snack-bar-container').should('contain', 'Unauthorized');
    
    });


    it("Valid user login", () => {

        cy.route( 
          {
            method: 'POST',
            url: 'http://localhost:8080/api/v0/users/token',
            status: 200,
            response: { },
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1NjE0NDc0MjcsInJvbGVzIjpbIkFETUlOIiwiQVVUSEVOVElDQVRFRCIsIk1BTkFHRVIiLCJPUEVSQVRPUiJdLCJpc3MiOiJjb20tZGVsZ2Fkb3RydWViYS1zcHJpbmciLCJleHAiOjE1NjE0NTEwMjcsImlhdCI6MTU2MTQ0NzQyNywidXNlciI6ImFkbWluIn0.X6cGsY2RYmbJyB21rZb6X91ns3xrL8TLfmHhCgJTpTQ',
            }
          }
        )
        .as('TOKEN'); 

        cy.get('#userName').type("admin");
        cy.get('#password').type('dsadasd');
        cy.get('#submit').click();
    
        cy.url().should('include', '/home');

      });

});