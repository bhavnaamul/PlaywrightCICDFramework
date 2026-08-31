# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-login.spec.ts >> Login/Logout flow >> Positive scenario for login
- Location: tests\E2E\e2e-login.spec.ts:46:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - main [ref=e3]:
    - generic [ref=e6]:
      - generic [ref=e13]:
        - heading "SecureBank" [level=1] [ref=e14]
        - paragraph [ref=e15]: Sign in to your account
      - generic [ref=e16]:
        - form "Sign in form" [ref=e17]:
          - generic [ref=e18]:
            - generic [ref=e19]: Username
            - textbox "Username" [ref=e20]:
              - /placeholder: Enter username
          - generic [ref=e21]:
            - generic [ref=e22]: Password
            - generic [ref=e23]:
              - textbox "Password" [ref=e24]:
                - /placeholder: Enter password
              - button "Show password" [ref=e25]
          - generic [ref=e29]:
            - checkbox "Remember me" [ref=e30]
            - checkbox [ref=e31]
            - generic [ref=e32] [cursor=pointer]: Remember me
          - button "Sign in to SecureBank" [ref=e33]: Sign In
        - link "Forgot password?" [ref=e35] [cursor=pointer]:
          - /url: /bank/forgot-password
      - generic [ref=e36]:
        - paragraph [ref=e37]: Test credentials
        - table [ref=e39]:
          - rowgroup [ref=e40]:
            - row [ref=e41]:
              - columnheader "Username" [ref=e42]
              - columnheader "Password" [ref=e43]
              - columnheader "Description" [ref=e44]
          - rowgroup [ref=e45]:
            - row [ref=e46]:
              - cell [ref=e47]:
                - generic [ref=e48]:
                  - text: standard_user
                  - button "Copy username standard_user" [ref=e49]
              - cell [ref=e53]:
                - generic [ref=e54]:
                  - text: bank_sauce
                  - button "Copy password for standard_user" [ref=e55]
              - cell "Full access" [ref=e59]
            - row [ref=e60]:
              - cell [ref=e61]:
                - generic [ref=e62]:
                  - text: locked_user
                  - button "Copy username locked_user" [ref=e63]
              - cell [ref=e67]:
                - generic [ref=e68]:
                  - text: bank_sauce
                  - button "Copy password for locked_user" [ref=e69]
              - cell "Locked account" [ref=e73]
            - row [ref=e74]:
              - cell [ref=e75]:
                - generic [ref=e76]:
                  - text: frozen_user
                  - button "Copy username frozen_user" [ref=e77]
              - cell [ref=e81]:
                - generic [ref=e82]:
                  - text: bank_sauce
                  - button "Copy password for frozen_user" [ref=e83]
              - cell "Frozen — no transfers" [ref=e87]
            - row [ref=e88]:
              - cell [ref=e89]:
                - generic [ref=e90]:
                  - text: overdraft_user
                  - button "Copy username overdraft_user" [ref=e91]
              - cell [ref=e95]:
                - generic [ref=e96]:
                  - text: bank_sauce
                  - button "Copy password for overdraft_user" [ref=e97]
              - cell "Negative balance" [ref=e101]
            - row [ref=e102]:
              - cell [ref=e103]:
                - generic [ref=e104]:
                  - text: slow_user
                  - button "Copy username slow_user" [ref=e105]
              - cell [ref=e109]:
                - generic [ref=e110]:
                  - text: bank_sauce
                  - button "Copy password for slow_user" [ref=e111]
              - cell "Slow loading" [ref=e115]
            - row [ref=e116]:
              - cell [ref=e117]:
                - generic [ref=e118]:
                  - text: error_user
                  - button "Copy username error_user" [ref=e119]
              - cell [ref=e123]:
                - generic [ref=e124]:
                  - text: bank_sauce
                  - button "Copy password for error_user" [ref=e125]
              - cell "Wrong loan total" [ref=e129]
            - row [ref=e130]:
              - cell [ref=e131]:
                - generic [ref=e132]:
                  - text: admin_user
                  - button "Copy username admin_user" [ref=e133]
              - cell [ref=e137]:
                - generic [ref=e138]:
                  - text: admin_sauce
                  - button "Copy password for admin_user" [ref=e139]
              - cell "Admin view" [ref=e143]
  - alert [ref=e144]
  - button "Send feedback or report an issue" [ref=e145] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { LoginPage } from '../../page-objects/LoginPage'
  3  | import { HomePage } from '../../page-objects/HomePage'
  4  | import users from '../../testdata/users.json'
  5  | import * as allure from 'allure-js-commons'
  6  | 
  7  | test.describe('Login/Logout flow', async () => {
  8  |   let loginPage: LoginPage
  9  |   let homePage: HomePage
  10 | 
  11 |   //before hook
> 12 |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 60000ms exceeded while running "beforeEach" hook.
  13 |     loginPage = new LoginPage(page)
  14 |     homePage = new HomePage(page)
  15 | 
  16 |     await allure.step('Navigate to Application AUT', async () => {
  17 |       await loginPage.visit()
  18 |     })
  19 |   })
  20 |   //negative scenario
  21 |   test('Negative scenario for login', async ({ page }) => {
  22 |     await allure.epic('---Login Management----')
  23 |     await allure.feature('Negative login')
  24 |     await allure.story('Create Investor')
  25 |     await allure.severity('critical')
  26 | 
  27 |     await allure.step('Login with Invalid credentials', async () => {
  28 |       await loginPage.login('invalidusername', 'invalidpassword')
  29 |     })
  30 |     await allure.step('Assert for Invalid credentials', async () => {
  31 |       await loginPage.assertErroMsg()
  32 |     })
  33 |   })
  34 | 
  35 |   for (const user of users) {
  36 |     test(`Login with ${user.username}`, async () => {
  37 |       await allure.epic('---Login Management----')
  38 |       await allure.feature('Parameterized login')
  39 |       await allure.story('Create Investor')
  40 |       await allure.severity('critical')
  41 |       await loginPage.login(user.username, user.password)
  42 |       await loginPage.assertErroMsg()
  43 |     })
  44 |   }
  45 |   //Positive scenario+logout
  46 |   test('Positive scenario for login', async ({ page }) => {
  47 |     await allure.epic('---Login Management----')
  48 |     await allure.feature('Positive login')
  49 |     await allure.story('Create Investor')
  50 |     await allure.severity('critical')
  51 | 
  52 |     await allure.step('Login with valid credentials', async () => {
  53 |       await loginPage.login('standard_user', 'bank_sauce')
  54 |     })
  55 |     await allure.step('Assert for valid credentials', async () => {
  56 |       await homePage.assertDashboard()
  57 |     })
  58 |   })
  59 | })
  60 | 
```