describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jon Love',
      username: 'Jon',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

      cy.contains('Wrong username or password')
    })
  })
})