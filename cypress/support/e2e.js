// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

// Capture screenshot on test failure and store under the spec-named folder
afterEach(function () {
	if (this.currentTest && this.currentTest.state === 'failed') {
		const testName = this.currentTest.title.replace(/[^a-zA-Z0-9-_]/g, '_');
		const specName = (Cypress.spec && Cypress.spec.name) ? Cypress.spec.name.replace(/[^a-zA-Z0-9-_]/g, '_') : 'spec';
		// Store screenshots by spec folder to make them easy to locate and attach to reports
		cy.screenshot(`${specName}/${testName} -- failed`, { capture: 'runner' });
	}
});