describe('Feature testing', () => {
  const basicTimeout = 1000;
  const cmdOptions = { log: false };

  describe('User Story 1 - Visit the initial project page', () => {
    it('User Story 1 - Current tasks list', () => {
      cy.visit('/')
      cy.title().should('eq', 'TODO List - Home')
      /**  Catch the existing todos without fake backend */
      // cy.intercept('api/taskItems').as('getTaskItems');
      // cy.wait('@getTaskItems', {timeout: basicTimeout}).then((wrapper)=>{
      //   TODO for production
      // })
      cy.get('[data-cy="homeMsg"]').should("contain", "Todo list successfully loaded")
      cy.get('[data-cy="homeVS"]').get(".p-virtualscroller-item").its('length').should("be.gte", 1)
      cy.get('[data-cy="homeVS"]').get(".p-virtualscroller-item").eq(0).find('[data-cy="todoTitle"]').should('not.be.empty')
      cy.get('[data-cy="homeVS"]').get(".p-virtualscroller-item").eq(0).find('[data-cy="todoState"]').should('not.be.empty')
      cy.get('[data-cy="VSfooter"]').should(($div) => {
        const text = $div.text()
        expect(text).to.match(/^\d.*items in the Todo list/)
      })
    })
  })


  describe('User Story 2 - Change a TODO state', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[data-cy="homeVS"]', cmdOptions).get('.p-inline-message', cmdOptions).first().as('firstTodo')
    })

    it('Click on the first checkbox state', () => {
      let firstTodoTitle = '';
      let firstTodoState = '';
      let vsContentLength = 0;



      // Scroll to the bottom of the virtual panel to get all the content
      cy.get('cdk-virtual-scroll-viewport', cmdOptions).scrollTo('bottomRight', {duration:1000}).then((scroll)=>{
        // Get the count of tasks
        cy.get('[data-cy="homeVS"]', cmdOptions).get('.p-inline-message', cmdOptions).its('length',cmdOptions).then((contentLength) => {
          vsContentLength = contentLength;
          // Get the first task title
          cy.get('@firstTodo', cmdOptions).find('[data-cy="todoTitle"]').then((pTagTitle)=>{
            firstTodoTitle = pTagTitle.text();
          })
          // Get the first task state
          cy.get('@firstTodo', cmdOptions).find('[data-cy="todoState"]').find('.p-tag-value').then((pTagState)=>{
            firstTodoState = pTagState.text();
          })
          // Change the first task state
          cy.get('@firstTodo', cmdOptions).find('p-checkbox').click()
          cy.get('cdk-virtual-scroll-viewport', cmdOptions).scrollTo('bottomRight', {duration:1000}).then((secondScroll)=>{
            cy.get('[data-cy="homeVS"]').get('.p-inline-message', cmdOptions).as('currentTaks')
            cy.get('@currentTaks').its('length', cmdOptions).should('be.equal', vsContentLength).then((pTagTitle) => {
              // Verify that the first task is now last in list with his state changed
              cy.get('@currentTaks').last().find('[data-cy="todoTitle"]').then((pTagTitle) => {
                expect(firstTodoTitle).to.be.equal(pTagTitle.text());
              })
              cy.get('@currentTaks').last(cmdOptions).find('[data-cy="todoTitle"]', cmdOptions).parent().should('have.css', 'text-decoration-line', 'line-through')

              cy.get('@currentTaks').last(cmdOptions).find('[data-cy="todoState"]', cmdOptions).then((pTagState) => {
                expect(firstTodoState).not.to.be.equal(pTagState.text());
              })
            })
          })

        })
      })

    })
  })

  describe('User Story 3 - Detail a TODO', () => {
    beforeEach(() => {
      cy.get('[data-cy="homeVS"]', cmdOptions).get('.p-inline-message', cmdOptions).first().as('firstTodo')
    })
    it('Get detail of a task', () => {
      cy.visit('/')
      let firstTodoTitle = '';
      cy.get('@firstTodo', cmdOptions).find('[data-cy="todoTitle"]').then((pTagTitle) => {
        firstTodoTitle = pTagTitle.text();
        cy.get('@firstTodo', cmdOptions).find('[data-cy="todoTitle"]').click()
        cy.url().should('match', /\/detail\/\d+/)
        cy.title().should('eq', 'TODO List - Task Detail')
        cy.get('[data-cy="todoTitle"]').find('.p-panel-title').should('contain', firstTodoTitle)
        cy.get('[data-cy="todoDescription"]').should('exist')
      })

    })
  })

  describe('User Story 4 - Add a new TODO', () => {
    beforeEach(() => {
      // cy.get('[data-cy="homeVS"]', cmdOptions).get('.p-inline-message', cmdOptions).first().as('firstTodo')
    })
    const todoTitle = 'A test title';
    const todoDescription = 'A test description';
    it('Add a task', () => {
      cy.visit('/')
      cy.get('[data-cy="addTodo"]').click()
      cy.get('[formcontrolname="title"]').should('exist')
      cy.get('[formcontrolname="description"]').should('exist')
      cy.get('[data-cy="saveTodo"]').should('exist').click().then((event) => {
        cy.get('.p-error').should('exist')
      })
      cy.get('[formcontrolname="title"]').type(todoTitle)
      cy.get('[formcontrolname="description"]').type(todoDescription)
      cy.get('[data-cy="saveTodo"]').click()
      cy.wait(500)
      cy.get('[data-cy="homeVS"]', cmdOptions).get('.p-inline-message', cmdOptions).first().find('[data-cy="todoTitle"]').then((pTagTitle) => {
        expect(todoTitle).to.be.equal(pTagTitle.text());
      })
    })
  })

})
