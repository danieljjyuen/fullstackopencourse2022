describe('Blog app', function() {
  const user = {
    username: 'root',
    name: 'name',
    password: 'password'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login').type('root')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#login').type('wrongname')
      cy.get('#password').type('wrongpw')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#login').type('root')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains(`${user.name} logged in`)
    })

    it('A blog can be created', function() {
      cy.get('#clickToOpen').click()
      cy.get('#title').type('blog title')
      cy.get('#author').type('blog author')
      cy.get('#url').type('blog url')
      cy.get('#createSubmit').click()
      cy.contains('blog title by blog author added')
      cy.contains('blog title blog author')
    })

    describe('blog created by same user', function() {
      beforeEach(function(){
        cy.get('#clickToOpen').click()
        cy.get('#title').type('blog title')
        cy.get('#author').type('blog author')
        cy.get('#url').type('blog url')
        cy.get('#createSubmit').click()
        cy.contains('blog title by blog author added')
        cy.contains('blog title blog author')
      })
      it('users can like a blog', function() {
        cy.contains('blog title blog author')
        cy.get('#toggleView').click()
        cy.contains('likes 0')
        cy.get('#like').click()
        cy.contains('likes 1')
      })
  
      it('same user can delete blog', function() {
        cy.get('#toggleView').click()
        cy.get('#remove').click()
        cy.contains('blog title blog author').should('not.exist')
      })
      
      describe('different user can\'t delete blog from another user', function() {
        beforeEach(function() {
  
          const user2 = {
            username: 'root2',
            name: 'name2',
            password:'password2'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user2)
          cy.get('#logout-button').click()
          cy.get('#login').type('root2')
          cy.get('#password').type('password2')
          cy.contains('login').click()
          
        })
  
        it('remove button should not be visible', function() {
          cy.contains('blog title blog author')
          cy.contains('name2 logged in')
          cy.get('#toggleView').click()
          cy.get('.showRemove').should('have.css', 'display', 'none')
        })
      })

      describe('blogs are ordered by number of likes', function() {
        beforeEach(function(){
          cy.contains('blog title blog author')
          cy.get('#title').type('blog title 2')
          cy.get('#author').type('blog author 2')
          cy.get('#url').type('blog url 2')
          cy.get('#createSubmit').click()
        })

        it('order will change based on likes', function() {
          cy.get('.blog').eq(0).should('contain', 'blog title blog author')
          cy.get('.blog').eq(1).should('contain', 'blog title 2 blog author 2')

          cy.get('.blog').eq(1).should('contain', 'blog title 2 blog author 2')
            .find('#toggleView')
            .click()

          cy.get('.blog').eq(1).should('contain', 'blog title 2 blog author 2')
            .find('#like')
            .click()
          cy.get('.blog').eq(0).should('contain', 'blog title 2 blog author 2')

        })
      })
    })
    })

})