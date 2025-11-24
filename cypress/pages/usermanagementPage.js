class usermanagement{
    elements = {
        addUserButton: () => cy.get('.bi-plus'),
        userRoleDropdown: () => cy.get('.oxd-select-text-input').eq(0),  
        usernameInput: () => cy.get('input.oxd-input--active').eq(1),
        empolyeeNameInput: () => cy.get('[placeholder="Type for hints..."]'),
        statusDropdown: () => cy.get('.oxd-select-text-input').eq(1),
        passwordInput: () => cy.get('input.oxd-input--active').eq(2),
        confirmPasswordInput: () => cy.get('[type="password"]').eq(1),
        saveButton: () => cy.get('.orangehrm-left-space'),
        resetButton: () => cy.get('button.oxd-button--ghost'),
        searchButton: () => cy.get('.orangehrm-left-space'), 
        cancelButton: () => cy.get('.oxd-button--ghost'),
    }

    selectUserRole(role){
        this.elements.userRoleDropdown().click();
        cy.get('.bi-caret-down-fill').eq(1).click();
        cy.contains(role).click();

    }

    selectStatus(status){
        this.elements.statusDropdown().click();
        cy.get('.bi-caret-down-fill').eq(2).click();
        cy.contains(status).click();
    }
    selectEmployeeName(name){
        this.elements.empolyeeNameInput().type(name);
        cy.get('.oxd-autocomplete-dropdown').contains(name).click();
    }



}
export default usermanagement