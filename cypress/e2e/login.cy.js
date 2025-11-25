import loginpage from "../pages/loginPage";
const lg = new loginpage();

describe("Login Module", () => {
    beforeEach(function () {
        cy.fixture('example.json').then(function (data) {
            this.data = data;
        });
        // use relative path; baseUrl is set in cypress.config.js
        cy.visit('/web/index.php/auth/login');
    });

    it("TC01: Should display the login form", () => {
        cy.url().should("include", "/auth/login");
        lg.elements.usernameInput().should("be.visible");
        lg.elements.passwordInput().should("be.visible");
        lg.elements.loginButton().should("be.visible");
        lg.elements.forgetPassworkLink().should("be.visible");
        
    });

    it("TC02: Should login with valid credentials", function () {
        cy.login(this.data.logindata.username, this.data.logindata.password);
        cy.url().should("include", "/dashboard");
    });

    it("TC03: Should not login with invalid credentials", function () {
        cy.login(this.data.logindata.invalidUsername,this.data.logindata.invalidPassword);
        lg.validateErrorMessage(this.data.errormsg.invalidCredentials);
    });

    it("TC04: Should not login with empty credentials", function () {
        lg.withoutCredentials();
    });

    it("TC05: Should not login with empty password", function () {
        lg.withoutPassword(this.data.logindata.username);
    });

    it("TC06: Should not login with empty username", function () {
       lg.withoutUsername(this.data.logindata.password);
    });

    it("TC07: Should not login with invalid password", function () {
        cy.login(this.data.logindata.username,this.data.logindata.invalidPassword);
        lg.validateErrorMessage(this.data.errormsg.invalidCredentials);
    });
    it.skip("TC08: Failing a test case for Requirement purpose", function () {   //Run this test case for checking screenshot in report
        cy.login(this.data.logindata.username,this.data.logindata.invalidPassword+"wrong");
        cy.url().should("include", "/dashboard");
    });











})