import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PayBillPage } from '../../page-objects/PayBillPage'
import * as allure from 'allure-js-commons'

test.describe('Transfer Checking', async () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let payBillPage: PayBillPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    payBillPage = new PayBillPage(page)
    await loginPage.visit()
    await loginPage.login('standard_user', 'bank_sauce')
    await homePage.assertDashboard()
  })
  test('pay bill for water utility', async ({ page }) => {
    await allure.epic('---Pay Bill Fund Management----')
    await allure.feature('Pay Bill')
    await allure.story('Pay Bill')
    await allure.severity('Normal')
    await allure.tms('INV-1234', 'Investor creation requirement')

    await allure.issue('BUG-5678', 'Investor creation defect')
    await homePage.clickOnTabs('Bill Pay')
    await payBillPage.openFromAccountDropdown()
    await payBillPage.selectFirstOption()
    await payBillPage.enterAmount('1.0')
    await payBillPage.openBillerDropdown()
    await payBillPage.reviewPayment()

    await payBillPage.sucessMsg()
  })
})
