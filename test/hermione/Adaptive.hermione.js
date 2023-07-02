const { assert } = require('chai');

describe("Общие требования",  async () => {
    afterEach(async function ({browser}) {
        await browser.execute(() =>
            window.localStorage.removeItem("example-store-cart")
        );
    });

    it("вёрстка должна адаптироваться под ширину экрана 1100px", async ({browser}) => {
        await browser.setWindowSize(1100, 800);
        await browser.url('/hw/store');
        const page = await browser.$(".Application");
        await page.waitForExist();

        await browser.assertView("plain", ".Application", {
            compositeImage: false,
        });
    });

    it("Вёрстка должна адаптироваться под ширину экрана 800px", async ({browser}) => {
        await browser.setWindowSize(800, 1000);

        await browser.url('/hw/store');

        const page = await browser.$(".Application");
        await page.waitForExist();

        await browser.assertView("plain", ".Application", {
            compositeImage: false,
        });
    });

    it("на ширине меньше 576px навигационное меню должно скрываться за гамбургер", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store');

        const page = await browser.$("nav");
        await page.waitForExist();

        await browser.assertView("plain", "nav", {
            compositeImage: false,
        });
    });

    it("при выборе элемента из меню гамбургера, меню должно закрываться", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store');

        const hamburger = await browser.$('.Application-Toggler')
        const menu = await browser.$('.Application-Menu')

        assert.equal(await hamburger.isDisplayed(), true)

        await hamburger.click()
        assert.equal(await menu.isDisplayed(), true)

        await menu.click()
        assert.equal(await menu.isDisplayed(), false)
    });

    it("Страницы главная, доставка и контакты имеют статическое содержимое", async ({browser}) => {
        await browser.setWindowSize(1920, 1080)
        await browser.url('/hw/store');

        await browser.assertView("home", ".Application", {
            compositeImage: true,
        });

        await browser.url('/hw/store/delivery');
        await browser.assertView("delivery", ".Application", {
            compositeImage: true,
        });

        await browser.url('/hw/store/contacts');
        await browser.assertView("contacts", ".Application", {
            compositeImage: true,
        });
    })
})