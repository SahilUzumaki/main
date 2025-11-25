const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: false,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    // set the application base URL here so tests can call `cy.visit('/path')`
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
