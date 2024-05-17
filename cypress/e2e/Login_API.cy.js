/// <reference types="cypress" />

describe('API Testing for /login Endpoint', () => {
    
    const validCredentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };
  
    const invalidCredentials = {
      email: 'invalid.email@reqres.in',
      password: 'invalidpassword'
    };
  
    const acceptableResponseTime = 500; // Define acceptable response time in ms
  
    it.only('successfully logs in with valid credentials', () => {
      cy.request('POST', '/login', validCredentials).then((response) => {
        cy.log(JSON.stringify(response.headers))
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(acceptableResponseTime);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4'); // Validate the token value
      });
    });
  
    




    it.only('fails to log in with invalid email', () => {
      cy.request({
        method: 'POST',
        url: '/login/2/',
        body: {
          email: invalidCredentials.email,
          password: validCredentials.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201); // Adjust status code according to your API
        cy.log(JSON.stringify(response.headers))
        cy.log(JSON.stringify(response.body))
        cy.log(JSON.stringify(response.body.status))

        
      });
    });


  
    it('fails to log in with invalid password', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: validCredentials.email,
          password: invalidCredentials.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400); // Adjust status code according to your API
        cy.log(JSON.stringify(response.headers))
        cy.log(JSON.stringify(response.body))
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('missing password');
      });
    });
  
    it('fails to log in with missing email', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          password: validCredentials.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Missing email');
      });
    });
  
    it('fails to log in with missing password', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          email: validCredentials.email
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Missing password');
      });
    });
  
    it('fails to log in with empty email and password', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          email: '',
          password: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Missing email and password');
      });
    });
  
    it('fails to log in with empty email', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          email: '',
          password: validCredentials.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Missing email');
      });
    });
  
    it('fails to log in with empty password', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          email: validCredentials.email,
          password: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Missing password');
      });
    });
  
    it('returns 405 for an invalid HTTP method', () => {
      cy.request({
        method: 'GET', // Assuming GET is not allowed on this endpoint
        url: '/api/login',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.include('Method Not Allowed');
      });
    });
  });
  