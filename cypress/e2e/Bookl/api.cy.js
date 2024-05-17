/// <reference types="cypress" />

describe('Api Testing with cypress',() => {
    const acceptableResponseTime = 1000;

    it('passes',()=>{
        cy.request('/users/2').then((response) =>{
            cy.log(JSON.stringify(response.body))
            cy.log(JSON.stringify(response.body.data.email))

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('support')

            // Assert the response type is JSON
      expect(response.headers['content-type']).to.include('application/json');

      // Assert the response body has the expected structure
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('object');

      // Assert specific fields in the response body
      expect(response.body.data).to.have.property('id', 2);
      expect(response.body.data).to.have.property('email');
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data).to.have.property('last_name');
      expect(response.body.data).to.have.property('avatar');

      // Further assertions on specific values
      expect(response.body.data.email).to.be.a('string').and.satisfy(email => email.includes('@'));
      expect(response.body.data.first_name).to.be.a('string');
      expect(response.body.data.last_name).to.be.a('string');
      expect(response.body.data.avatar).to.be.a('string').and.satisfy(url => url.startsWith('https://'));

      // Example of checking the value of a specific field
      // (Assuming you know the exact expected value)
      expect(response.body.data.first_name).to.eq('Janet'); // Replace 'Janet' with the expected value

        })
    })

    it('fetches user data successfully within acceptable time', () => {
        cy.request('/users/2').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.duration).to.be.lessThan(acceptableResponseTime);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id', 2);
        });
      });
    
      it('returns 404 for an invalid endpoint', () => {
        cy.request({
          url: '/invalid-endpoint',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    
      it('returns 401 for unauthorized access', () => {
        cy.request({
          url: '/users/2',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer invalid_token'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    
      it('returns 400 for a bad request with invalid input', () => {
        cy.request({
          url: '/users',
          method: 'POST',
          body: { invalid: 'data' },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      
    });

})