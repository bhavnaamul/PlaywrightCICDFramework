import { test, Page, Locator, expect } from '@playwright/test'

export class PayBillPage {
  readonly page: Page
  readonly FromAccount: Locator
  readonly FromAccountOption: Locator
  readonly Biller: Locator
  readonly Amount: Locator
  readonly reviewTransferBtn: Locator
  readonly confirmTransfer: Locator
  readonly successMsg: Locator
  readonly referenceID: Locator
  readonly errorMsg: Locator

  constructor(page: Page) {
    this.page = page
    this.FromAccount = page.locator('#bill-pay-from-trigger')
    this.FromAccountOption = page.getByTestId('bill-pay-from-option')

    this.Biller = page.locator('#biller-search-input')

    this.Amount = page.locator('#bill-amount')
    this.reviewTransferBtn = page.getByTestId('review-bill-btn')
    this.confirmTransfer = page.getByTestId('confirm-bill-btn')
    this.successMsg = page.getByRole('heading', { name: 'Payment Scheduled' })

    this.referenceID = page.getByTestId('bill-pay-ref-id')
    this.errorMsg = page.getByTestId('transfer-error-message')
  }

  async openFromAccountDropdown() {
    await this.FromAccount.click()
  }

  async selectFirstOption() {
    console.log(
      '*****option texts:',
      await this.FromAccountOption.allTextContents(),
    )

    await this.FromAccountOption.first().click()
  }

  async openBillerDropdown() {
    await this.Biller.click()
    await this.Biller.fill('Metro')
    await this.Biller.locator('[data-testid="biller-option"]  span').click()
  }

  async selectOption(index: number) {
    await this.FromAccountOption.nth(index).waitFor({
      state: 'visible',
    })

    await this.FromAccountOption.nth(index).click()
  }

  async enterAmount(amt: string) {
    await this.Amount.fill(amt)
  }

  async reviewPayment() {
    await this.reviewTransferBtn.click()
    await this.confirmTransfer.click()
  }

  async sucessMsg() {
    await expect(this.successMsg).toBeVisible()
    console.log(`the text is ${await this.referenceID.textContent()}`)
  }
}
