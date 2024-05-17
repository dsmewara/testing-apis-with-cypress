describe('API Testing for /login Endpoint', () => {

    it.only('API Test - Validate Headers',()=>{
        cy.request('/users/2').as('user')
        cy.get('@user')
        .its('headers')
        .its('content-type')
        .should('include','application/json')

        cy.get('@user')
        .its('headers')
        .its('connection')
        .should('include','keep-alive')

    })

    it.only('Api Test - Status code',()=>{
        cy.request('/users/2').as('existingUser')
        cy.get('@existingUser')
        .its('status')
        .should('equal',200)

        //404 status code
        cy.request({url:'users/not-exist',failOnStatusCode: false}).as('nonExistingUser')
        cy.get('@nonExistingUser')
        .its('status')
        .should('equal',404)

    })

    it.only('fails to log in with invalid user', () => {
        cy.request({url:'users/non-exist',failOnStatusCode: false}).then((response) => {
        cy.log(JSON.stringify(response.headers))
        cy.log(JSON.stringify(response.body))
        cy.log(JSON.stringify(response.body.status))

        expect(response.status).to.eq(404); // Adjust status code according to your API
        
        });
    });

    it.only('APi Test --GET Method', () => {
        cy.request({url:'users/2',method :'GET'}).as('user')
        cy.get('@user').then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200);
        expect(response.body.data.id).equal(2)
        expect(response.body.data.email).contain('janet.weaver@reqres.in') // Adjust status code according to your API
        expect(response.body.data.last_name).not.to.contain('sonar')

        const userID=response.body.data.id
        expect(userID).to.equal(2)
        
        });
    });

    it.only('Api Test -- POST Method',()=>{
        cy.request({
            url: '/login',
            method:'POST', 
            body:{
                email:'eve.holt@reqres.in',
                password:'cityslicka'
            }}).as('loginrequest')

        cy.get('@loginrequest').its('status').should('equal',200)
        cy.get('@loginrequest').then((response)=>{
            expect(response.body.token).to.equal("QpwL5tke4Pnpja7X4")

        })


    })


    it.only('Api Test -- POST request Error ',()=>{
        cy.request({
            url: '/login',
            method:'POST', 
            failOnStatusCode: false,
            body:{
                    email:'eve.holt@reqres.in',
                }
            }).as('loginrequest')

        cy.get('@loginrequest').its('status').should('equal',400)
        cy.get('@loginrequest').then((response)=>{
            expect(response.body.error).to.equal('Missing password')

        })


    })

    it.only('API Test -- DELETE Request',()=>{
        cy.request({url:'/users/2',method:'DELETE'}).as('deleteUser')
        cy.get('@deleteUser').its('status').should('equal',204)
    })

    it.only('APT Test -- PUT Request',()=>{
        cy.request({
            url:'/users/2',
            method:'PUT',
            body:{
                    name:'name-update'

                 }   
        }).as('updateUser')
        cy.get('@updateUser').its('status').should('equal',200)
        cy.get('@updateUser').then((res)=>{
            expect(res.body.name).to.equal('name-update')

        })
    })

});