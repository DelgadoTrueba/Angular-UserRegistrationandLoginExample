/// <reference types="Cypress" />

describe("Management Employees - DELETE", () => {
    
    beforeEach(() => {
    
        cy.request({
            method: 'POST',
            url: Cypress.env("apiUrl") + '/users/token',
            auth: {
                'user': 'admin',
                'pass': 'admin',
                'sendImmediately': true
            }
        }).as("TOKEN");

        cy.get("@TOKEN").then( (response) => {
            let token = response.headers.authorization.substring(7);

            cy.request({
                method: 'POST',
                url:  Cypress.env("apiUrl") + '/employees',
                auth:{
                    'bearer': token,
                },
                body: {
                    id: 0,
                    firstName: "Jose Manuel",
                    lastName: "Delgado Trueba",
                    email: "jd@gmail.com"
                }
            })
            .as("EMPLOYEE")

        });

		cy.visit("/");

        cy.get('#userName').type("admin");
        cy.get('#password').type('admin');
        cy.get('#submit').click();
    
        cy.url().should('include', '/home');

        // Start server to listen to routes.
        cy.server();

        cy.route( 
            {
              method: 'DELETE',
              url:  Cypress.env("apiUrl") + '/employees/*',
            }
          )
        .as('DELETE_REQUEST');

    });
  
    it("Delete - Employee", () => {

      cy.get('mat-table').find("mat-cell").contains("Jose Manuel").parent().as("field");

      cy.get("@field").contains("close").click();

      cy.get(".mat-raised-button").click();

      cy.wait("@DELETE_REQUEST");

      cy.get('mat-table').find("mat-cell").as("cells");
      
      cy.get("@cells").then( (cells) => {
        expect(cells).not.contain('Jose Manuel');
      })

    });


});