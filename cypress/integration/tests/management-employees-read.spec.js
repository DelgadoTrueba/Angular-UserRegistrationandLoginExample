/// <reference types="Cypress" />

describe("Management Employees - READ", () => {
    
    beforeEach(() => {
    
        cy.request({
            method: 'POST',
            url:  Cypress.env("apiUrl") + '/users/token',
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

    });
  
    it("READ - Employee", () => {

      cy.get('mat-table').find("mat-cell").contains("Jose Manuel").parent().as("field");

      cy.get("@field").contains("visibility").click();

      cy.get('#firstName').invoke('val').then( (inputText) => {
        expect(inputText).eq('Jose Manuel');
      });
      
      cy.get('#lastName').invoke('val').then( (inputText) => {
        expect(inputText).eq('Delgado Trueba');
      });
      
      cy.get('#email').invoke('val').then( (inputText) => {
        expect(inputText).eq('jd@gmail.com');
      });
      
    });

    after( () => {
       cy.get("@EMPLOYEE").then((response) => {
            let id = response.body.id;

            cy.get("@TOKEN").then((response) => {
                let token = response.headers.authorization.substring(7);

                cy.request({
                    method: 'DELETE',
                    url:  Cypress.env("apiUrl") + '/employees' + "/" + id,
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