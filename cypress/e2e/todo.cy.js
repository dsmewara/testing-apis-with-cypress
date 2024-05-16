describe('TODO api testing', () => {
    let todoItem;
    it('fetches Todo items - GET', () => {
        cy.request('/todos/').as('todoRequest');
        cy.get('@todoRequest').then(todos => {
           todoItem = todos.body[0]['_id']
            expect(todos.status).to.eq(200);
            assert.isArray(todos.body, 'Todos Response is an array')
        });
    });
 
    it('deletes Todo items - DELETE', () => {
        cy.request('DELETE', `/todos/${todoItem}`).as('todoRequest');
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isString(todos.body, 'todo deleted!')
        });
    });
 
    it('Adds Todo item - POST', () => {
        cy.request('POST', '/todos/', { task: "run tests" }).as('todoRequest');
        // adds new Todo item by defining Todo name
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            cy.wrap(todos.body).should('deep.include', {
                task: 'run tests',
                completed: false,
            });
        });
    });
 });
 