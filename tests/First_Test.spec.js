import { test, expect } from '@playwright/test';

function EmailGenerate() {
    const randomNum = Math. floor(Math. random()*1000) + 1
    return `aqa_test${randomNum}@gmail.com`
    
}
const validPass = "1qaz@WSX"
const invalidPass = "12345678"
test.describe("E2E tests", ()=>{
    test.beforeEach( async({page})=>{
        await page.goto("https://qauto.forstudy.space/")
    })

    test("POSITIVE: Register user with valid data", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").fill('An')
        await page.locator("//input[@id='signupLastName']").fill('Pasdfghjklzxcvbnmfgd')
        await page.locator("//input[@id='signupEmail']").fill(EmailGenerate())
        await page.locator("//input[@id='signupPassword']").fill(validPass)
        await page.locator("//input[@id='signupRepeatPassword']").fill(validPass)
        await page.locator("//button", {hasText: 'Register'}).click()
        await expect(page.locator("//a[@class='btn header-link -active']", {hasText: "Garage"})).toBeVisible()
    })

    test("NEGATIVE: Try to sign up without data", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").click()
        await page.locator("//input[@id='signupLastName']").click()
        await page.locator("//input[@id='signupEmail']").click()
        await page.locator("//input[@id='signupPassword']").click()
        await page.locator("//input[@id='signupRepeatPassword']").click()
        await page.locator("//input[@id='signupPassword']").click()

        await expect(page.locator("//p[contains(text(), 'Name required')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Last name required')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Email required')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Password required')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Re-enter password required')]")).toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(page.locator("//input[@id='signupName']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupLastName']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupEmail']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupPassword']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupRepeatPassword']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')

        await expect(page.locator('//button', {hasText: 'Register'})).toBeDisabled()
    })
    
    test("NEGATIVE: Sign up with invalid data", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").fill('Андрій')
        await page.locator("//input[@id='signupLastName']").fill('12345')
        await page.locator("//input[@id='signupEmail']").fill('qwerty.com')
        await page.locator("//input[@id='signupPassword']").fill(invalidPass)
        await page.locator("//input[@id='signupRepeatPassword']").fill(invalidPass)
        await page.locator("//input[@id='signupPassword']").click()

        await expect(page.locator("//p[contains(text(), 'Name is invalid')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Last name is invalid')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//p[contains(text(), 'Email is incorrect')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupPassword']/following-sibling::div[contains(@class, 'invalid-feedback')]/p[contains(text(), 'Password has to be from 8 to 15 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupRepeatPassword']/following-sibling::div[@class='invalid-feedback']/p[contains(text(), 'Password has to be from 8 to 15 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(page.locator("//input[@id='signupName']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupLastName']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupEmail']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupPassword']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupRepeatPassword']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')

        await expect(page.locator('//button', {hasText: 'Register'})).toBeDisabled()
    })
    test("NEGATIVE: Sign up with no matched password", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").fill('An')
        await page.locator("//input[@id='signupLastName']").fill('Pasdfghjklzxcvbnmfgd')
        await page.locator("//input[@id='signupEmail']").fill(EmailGenerate())
        await page.locator("//input[@id='signupPassword']").fill(validPass)
        await page.locator("//input[@id='signupRepeatPassword']").fill('1qaz@WSX2')
        await page.locator("//input[@id='signupPassword']").click()

        await expect(page.locator("//p[contains(text(), 'Passwords do not match')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect(page.locator("//input[@id='signupRepeatPassword']")).toHaveCSS('border-bottom-color', 'rgb(220, 53, 69)')

        await expect(page.locator('//button', {hasText: 'Register'})).toBeDisabled()

    })

    test("NEGATIVE: Sign up - Name and last name with 1 symbol", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").fill('A')
        await page.locator("//input[@id='signupLastName']").fill('P')
        await page.locator("//input[@id='signupEmail']").fill(EmailGenerate())
        await page.locator("//input[@id='signupPassword']").fill(validPass)
        await page.locator("//input[@id='signupRepeatPassword']").fill(validPass)
    
        await expect(page.locator("//p[contains(text(), 'Name has to be from 2 to 20 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')        
        await expect(page.locator("//p[contains(text(), 'Last name has to be from 2 to 20 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        
        await expect(page.locator('//button', {hasText: 'Register'})).toBeDisabled()

    })
    test("NEGATIVE: Sign up - Name and last name with more than 20 symbols", async({page})=>{
        await page.locator("//button", {hasText: 'Sign up'}).click()
        await page.locator("//input[@id='signupName']").fill('Awertyuiopasdfghjklzxcv')
        await page.locator("//input[@id='signupLastName']").fill('Awertyuiopasdfghjklzxcv')
        await page.locator("//input[@id='signupEmail']").fill(EmailGenerate())
        await page.locator("//input[@id='signupPassword']").fill(validPass)
        await page.locator("//input[@id='signupRepeatPassword']").fill(validPass)
    
        await expect(page.locator("//p[contains(text(), 'Name has to be from 2 to 20 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')        
        await expect(page.locator("//p[contains(text(), 'Last name has to be from 2 to 20 characters long')]")).toHaveCSS('color', 'rgb(220, 53, 69)')
        
        await expect(page.locator('//button', {hasText: 'Register'})).toBeDisabled()

    })

})