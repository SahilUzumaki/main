# RoadTest - Cypress E2E Testing Framework

This project contains end-to-end (E2E) test automation for the OrangeHRM demo application using Cypress. The test suite covers Login and User Management modules with comprehensive test scenarios.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Test Data Configuration](#test-data-configuration)
- [Writing Tests](#writing-tests)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Edge, or Electron)

To verify your installation:
```bash
node --version
npm --version
```

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd RoadTest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - Cypress
   - cypress-mochawesome-reporter
   - mochawesome
   - mochawesome-merge
   - mochawesome-report-generator

## 📁 Project Structure

```
RoadTest/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   ├── login.cy.js         # Login module tests
│   │   └── user_management.cy.js  # User management tests
│   ├── fixtures/               # Test data files
│   │   └── example.json        # Test data configuration
│   ├── pages/                  # Page Object Model classes
│   │   ├── loginPage.js
│   │   ├── navigation.js
│   │   └── usermanagementPage.js
│   ├── reports/                # Generated test reports
│   ├── screenshots/            # Test failure screenshots
│   └── support/                # Custom commands and configurations
│       ├── commands.js         # Custom Cypress commands
│       └── e2e.js              # E2E test configuration
├── cypress.config.js           # Cypress configuration file
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## 🚀 Running Tests

### Open Cypress Test Runner (Interactive Mode)

To run tests in the interactive Cypress Test Runner:

```bash
npx cypress open
```

This opens the Cypress GUI where you can:
- Select a browser
- Choose and run individual test files
- Watch tests execute in real-time
- Debug tests using the developer tools

### Run Tests in Headless Mode

To run all tests in headless mode (command line):

```bash
npx cypress run
```

### Run Specific Test Files

To run a specific test file:

```bash
# Run login tests only
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run user management tests only
npx cypress run --spec "cypress/e2e/user_management.cy.js"
```

### Run Tests in a Specific Browser

```bash
# Run in Chrome
npx cypress run --browser chrome

# Run in Firefox
npx cypress run --browser firefox

# Run in Edge
npx cypress run --browser edge
```

## 📊 Test Reports

This project uses **mochawesome** for generating detailed HTML test reports.

### Generate Reports

The project includes npm scripts for generating comprehensive test reports:

1. **Run tests and generate reports (all-in-one):**
   ```bash
   npm run report:all
   ```
   This command:
   - Runs all tests with JSON reporting enabled
   - Merges individual JSON reports
   - Generates a final HTML report

2. **Step-by-step report generation:**

   ```bash
   # Step 1: Run tests with JSON reporting
   npm run cypress:run:report

   # Step 2: Merge JSON reports
   npm run report:merge

   # Step 3: Generate HTML report
   npm run report:generate
   ```

### View Reports

After generating reports, open the HTML report:

```
cypress/reports/html/report.html
```

The report includes:
- Test execution summary
- Pass/fail status for each test
- Execution time
- Screenshots for failed tests
- Detailed error messages

## 📝 Test Data Configuration

Test data is stored in `cypress/fixtures/example.json`. You can modify this file to update test credentials and test data.

**Current test data structure:**
- `logindata`: Login credentials (username, password, invalid credentials)
- `errormsg`: Error messages for validation
- `usermanagement`: User management test data (user roles, employee names, passwords)

**Note:** The test application URL is hardcoded in test files. To change it, update the `cy.visit()` calls in the test files.

## ✍️ Writing Tests

### Test Structure

Tests are organized using the **Page Object Model (POM)** pattern:

- **Page Objects** (`cypress/pages/`): Encapsulate page elements and actions
- **Test Files** (`cypress/e2e/`): Contain test cases using page objects
- **Custom Commands** (`cypress/support/commands.js`): Reusable Cypress commands

### Example: Adding a New Test

1. **Create or update a page object** in `cypress/pages/`:
   ```javascript
   class MyPage {
     elements = {
       button: () => cy.get('[data-testid="my-button"]')
     }
     
     clickButton() {
       this.elements.button().click();
     }
   }
   export default MyPage;
   ```

2. **Write a test** in `cypress/e2e/`:
   ```javascript
   import MyPage from "../pages/myPage";
   const page = new MyPage();
   
   describe("My Feature", () => {
     it("should perform an action", () => {
       cy.visit("https://example.com");
       page.clickButton();
       // Add assertions
     });
   });
   ```

### Custom Commands

The project includes a custom `login` command. To add more custom commands, edit `cypress/support/commands.js`:

```javascript
Cypress.Commands.add('myCustomCommand', (param1, param2) => {
  // Your command implementation
});
```

## 🧪 Test Coverage

### Login Module Tests
- ✅ Display login form elements
- ✅ Login with valid credentials
- ✅ Prevent login with invalid credentials
- ✅ Validate empty credentials handling
- ✅ Validate empty password handling
- ✅ Validate empty username handling
- ✅ Validate invalid password handling

### User Management Module Tests
- ✅ Navigate to User Management page
- ✅ Display Add User form
- ✅ Add a new user successfully
- ✅ Search for newly added user
- ✅ Prevent adding user with existing username

## ⚙️ Configuration

### Cypress Configuration

The main configuration is in `cypress.config.js`. Key settings:
- Reporter: `cypress-mochawesome-reporter`
- Report directory: `cypress/reports`
- Screenshots: Embedded in reports
- Assets: Inline in HTML reports

### Environment Variables

You can create a `cypress.env.json` file to store environment-specific variables:

```json
{
  "baseUrl": "https://opensource-demo.orangehrmlive.com",
  "apiUrl": "https://api.example.com"
}
```

Access in tests:
```javascript
Cypress.env('baseUrl')
```

## 🐛 Troubleshooting

### Common Issues

1. **Tests fail to run:**
   - Ensure all dependencies are installed: `npm install`
   - Verify Node.js version is compatible

2. **Reports not generating:**
   - Check that `cypress/reports` directory exists
   - Ensure all npm scripts ran successfully

3. **Tests timeout:**
   - Check internet connection (tests run against live demo site)
   - Verify the application URL is accessible

4. **Screenshots not appearing:**
   - Check `cypress/screenshots` directory
   - Verify reporter configuration in `cypress.config.js`

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Mochawesome Documentation](https://github.com/adamgruber/mochawesome)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)

## 📄 License

This project is for testing purposes only.

---

**Happy Testing! 🎉**
