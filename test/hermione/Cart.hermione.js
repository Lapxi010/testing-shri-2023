const { assert } = require('chai');

describe("Тестирование корзины", async () => {
    afterEach(async function ({browser}) {
        await browser.execute(() =>
            window.localStorage.removeItem("example-store-cart")
        );
    });

    it("Чек формируется правильно", async ({browser}) => {
        await browser.setWindowSize(1100, 800);
        await browser.url('/hw/catalog/0');

        await browser.url("/hw/store/catalog/0");
        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click()

        await browser.url("/hw/store/cart");

        const name = await browser.$('#f-name')
        const phone = await browser.$('#f-phone')
        const address = await browser.$('#f-address')

        await name.setValue('Vasya')
        await phone.setValue('+7999731231312')
        await address.setValue('Moskva yl tolstova')

        await browser.$('.Form-Submit').click()

        const orderId = await browser.$('.Cart-Number').getText()

        assert.equal(
             orderId.length,
            1,
            "Номер чека сформирован не верно"
        );
        await browser.refresh();
    });

})