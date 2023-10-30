describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jon Love',
      username: 'Jon',
      password: '123'
    }
    const user1 = {
      name: 'Test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Username:')
    cy.contains('Password:')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Jon')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Jon Love is logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('oops')
      cy.get('#password').type('nope')
      cy.get('#login-button').click()

      cy.get('.notificationMessage')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jon', password: '123' })
    })

    it.only('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('This is a blog title')
      cy.get('#author-input').type('Cypress tester')
      cy.get('#url-input').type('some url')
      cy.get('#create-button').click()

      cy.contains('This is a blog title - Cypress tester')
    })
    describe('With blogs premade', function() {
      beforeEach(function() {
      // make blog
      })

      it('User can like a blog', function() {
      // ...
      })
      it('User can delete own blog', function() {
        // ...
      })
      it('')
    })
    describe('Different user is logged in', function() {
      beforeEach(function() {
      // log in user here
      })

      it('User cant delete other users blog', function() {
      // ...
      })
      it('Check if most liked blogs order is corect')
    })
  })

})