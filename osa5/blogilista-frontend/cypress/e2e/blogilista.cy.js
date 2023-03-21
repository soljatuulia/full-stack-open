describe('Blog app', function() {
	beforeEach(function() {
		cy.visit('http://localhost:3000');
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Test User',
			username: 'testuser',
			password: 'salainen'
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
	});

	it('Login form is shown', function() {
		cy.contains('login');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function() {
			cy.get('input:first').type('testuser');
			cy.get('input:last').type('salainen');
			cy.contains('login').click();

			cy.contains('Test User logged in');
		});

		it('fails with wrong credentials', function() {
			cy.get('input:first').type('testuser');
			cy.get('input:last').type('wrong');
			cy.contains('login').click();

			cy.get('.error')
				.should('contain', 'Wrong username or password');

			cy.get('html')
				.should('not.contain', 'Test User logged in');
		});
	});

	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('input:first').type('testuser');
			cy.get('input:last').type('salainen');
			cy.contains('login').click();
		});

		it('a blog can be created', function() {
			cy.contains('create').click();
			cy.get('#title').type('Test Blog');
			cy.get('#author').type('Test Blogger');
			cy.get('#url').type('www.test.url');
			cy.get('#create-button').click();
			
			cy.get('html')
				.should('contain', 'Test Blog Test Blogger');
		});

		it('user can like a blog', function() {
			cy.contains('create').click();
			cy.get('#title').type('Test Blog');
			cy.get('#author').type('Test Blogger');
			cy.get('#url').type('www.test.url');
			cy.get('#create-button').click();

			cy.contains('view').click();
			cy.get('#like-button').click();
		});

		it('user can delete a blog added my them', function() {
			cy.contains('view').click();
			cy.contains('delete').click();

			cy.get('html')
				.should('not.contain', 'Test Blog Test Blogger');			
		});

		it('delete button is not shown for blogs they did not add', function() {
			cy.contains('create').click();
			cy.get('#title').type('Test Blog');
			cy.get('#author').type('Test Blogger');
			cy.get('#url').type('www.test.url');
			cy.get('#create-button').click();

			cy.contains('logout').click();
			
			const user = {
				name: 'Another User',
				username: 'anotheruser',
				password: 'salainen'
			};
			cy.request('POST', 'http://localhost:3003/api/users/', user);
			
			cy.get('input:first').type('anotheruser');
			cy.get('input:last').type('salainen');
			cy.contains('login').click();

			cy.contains('view').click();

			cy.should('not.contain', 'delete');	
		});
	});
});