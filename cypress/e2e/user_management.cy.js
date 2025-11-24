import usermanagement from "../pages/usermanagementPage";
import navigatoins from "../pages/navigation";
const nav = new navigatoins();
const um = new usermanagement();

describe("User Management Module", () => {
    let uniqueUsername = '';
    beforeEach(function () {
        cy.fixture('example.json').then(function (data) {
            this.data = data;
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.login(this.data.logindata.username, this.data.logindata.password);
    });
});

    it("TC01: Should navigate to User Management page", function () {
        cy.url().should("include", "/dashboard");
        nav.clickonAdminTab();
        cy.url().should("include", "/admin/viewSystemUsers");
    });
    it("TC02: Should display Add User form", function () {
        nav.clickonAdminTab();
        um.elements.addUserButton().click();
        um.elements.userRoleDropdown().should('be.visible');
        um.elements.empolyeeNameInput().should('be.visible');
        um.elements.usernameInput().should('be.visible');
        um.elements.statusDropdown().should('be.visible');
        um.elements.passwordInput().should('be.visible');
        um.elements.confirmPasswordInput().should('be.visible');
        um.elements.saveButton().should('be.visible');
        um.elements.cancelButton().should('be.visible');
    });

    it("TC03: Should able to add a new user", function () {
        nav.clickonAdminTab();
        um.elements.addUserButton().click();
        um.elements.userRoleDropdown().click();
        um.selectUserRole(this.data.usermanagement.userroleESS);
        um.selectEmployeeName(this.data.usermanagement.employeeName);
        const base = this.data.usermanagement.username;
        uniqueUsername = `${base}_${Date.now()}`;
        um.elements.usernameInput().type(uniqueUsername);
        um.elements.statusDropdown().click();
        um.selectStatus(this.data.usermanagement.status);
        um.elements.passwordInput().type(this.data.usermanagement.password);
        um.elements.confirmPasswordInput().type(this.data.usermanagement.confirmPassword);
        um.elements.saveButton().click();
        cy.contains('Successfully Saved').should('be.visible');
    });

    it("TC04: Search for the newly added user", function () {
        nav.clickonAdminTab();
        um.elements.usernameInput().type(uniqueUsername);
        um.elements.searchButton().click();
        cy.get('.oxd-table-card').should('contain.text', uniqueUsername);
    });

    it("TC05: Should not add user with existing username", function () {
        nav.clickonAdminTab();
        um.elements.addUserButton().click();
        um.elements.userRoleDropdown().click();
        um.selectUserRole(this.data.usermanagement.userroleESS);
        um.selectEmployeeName(this.data.usermanagement.employeeName);
        um.elements.usernameInput().type(uniqueUsername);
        cy.contains('Already exists').should('be.visible');
    });
})