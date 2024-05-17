//https://demoqa.com/swagger/#/

describe('API Response Validation', () => {
    it('should validate the response structure and data', () => {
      cy.request('GET', 'your-api-endpoint-url').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate response body
        expect(response.body).to.have.property('books');
        expect(response.body.books).to.be.an('array');
  
        // Validate the first book object
        const book = response.body.books[0];
        expect(book).to.have.property('isbn').that.is.a('string');
        expect(book).to.have.property('title').that.is.a('string');
        expect(book).to.have.property('subTitle').that.is.a('string');
        expect(book).to.have.property('author').that.is.a('string');
        expect(book).to.have.property('publish_date').that.is.a('string');
        expect(book).to.have.property('publisher').that.is.a('string');
        expect(book).to.have.property('pages').that.is.a('number');
        expect(book).to.have.property('description').that.is.a('string');
        expect(book).to.have.property('website').that.is.a('string');
  
        // Additional validations if necessary
        expect(new Date(book.publish_date)).to.be.a('date'); // Validate date format
        expect(book.pages).to.be.at.least(0); // Ensure pages is non-negative
      });
    });
  });
  