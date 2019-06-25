/// <reference types="Cypress" />

describe("Management Employees - EDIT", () => {
    
    beforeEach(() => {
    
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v0/users/token',
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
                url: 'http://localhost:8080/api/v0/employees',
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

        cy.visit("/welcome/login");

        cy.get('#userName').type("admin");
        cy.get('#password').type('admin');
        cy.get('#submit').click();
    
        cy.url().should('include', '/home');

        // Start server to listen to routes.
        cy.server();

        cy.route( 
            {
              method: 'PUT',
              url: 'http://localhost:8080/api/v0/employees',
            }
          )
        .as('UPDATE_REQUEST');
    });
  
    it("EDIT - Employee", () => {

      cy.get('mat-table').find("mat-cell").contains("Jose Manuel").parent().as("field");

      cy.get("@field").contains("edit").click();

      cy.get('#firstName').clear().type("CHANGE");
      cy.get('#lastName').clear().type("CHANGE");
      cy.get('#email').clear().type("CHANGE@gmail.com")

      cy.get('.mat-raised-button').click();
     
      cy.wait("@UPDATE_REQUEST");
      cy.get("mat-table").find("mat-cell").contains("CHANGE").parent().as("field");

      cy.get("@field").should('contain', 'CHANGE');
      cy.get("@field").should('contain', 'CHANGE');
      cy.get("@field").find("mat-cell").should('contain', 'CHANGE@gmail.com');
      
    });

    after( () => {
       cy.get("@EMPLOYEE").then((response) => {
            let id = response.body.id;

            cy.get("@TOKEN").then((response) => {
                let token = response.headers.authorization.substring(7);

                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:8080/api/v0/employees' + "/" + id,
                    auth:{
                      'bearer': token,
                    }
                }).then( response => {
                    expect(response.status).to.eq(200)
                })
            
            })

        })
    })


});