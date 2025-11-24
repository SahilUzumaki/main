class loginpage {
    elements = {  
        usernameInput:()=> cy.get('[name="username"]'),
        passwordInput:()=> cy.get('[name="password"]'),
        loginButton:()=> cy.get('[type="submit"]'),  
        forgetPassworkLink:()=> cy.get('.orangehrm-login-forgot-header'),
        errorMessageLbl:()=> cy.get('.oxd-alert-content-text'),
        requiredFieldMsg:()=> cy.get('.oxd-input-field-error-message')


    }

    validateErrorMessage(expectedMessage){
        this.elements.errorMessageLbl().should('be.visible').and('contain', expectedMessage);
    }

    withoutCredentials(){
        this.elements.loginButton().click();
        this.elements.requiredFieldMsg().should('have.length',2);
        this.elements.requiredFieldMsg().first().should('contain','Required');
        this.elements.requiredFieldMsg().last().should('contain','Required');
    }
    withoutPassword(username){
        this.elements.usernameInput().type(username);
        this.elements.loginButton().click();
        this.elements.requiredFieldMsg().should('have.length',1);
        this.elements.requiredFieldMsg().should('contain','Required');
    }
    withoutUsername(password){
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
        this.elements.requiredFieldMsg().should('have.length',1);
        this.elements.requiredFieldMsg().should('contain','Required');
    }   




}


export default loginpage