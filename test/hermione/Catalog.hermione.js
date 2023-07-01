const { assert } = require('chai');

describe('Проверка каталога на функциональность', () => {
    it("Cодержимое корзины должно сохраняться между перезагрузками страницы;", async ({browser}) => {
        browser.setWindowSize(1366, 768);
        await browser.url("/hw/store/catalog/0");

        const btn = await browser.$('.ProductDetails-AddToCart')

        await btn.click()

        await browser.url('/hw/store/cart')

        const productNameBefore = await browser.$(".Cart-Name");

        browser.refresh();

        const productNameAfter = await browser.$(".Cart-Name");

        assert.equal(
            await productNameBefore.getText(),
            await productNameAfter.getText(),
            "товар не сохранился при перезагрузке"
        );
    });
    it("Если товар уже добавлен в корзину, повторное нажатие кнопки добавить в корзину должно увеличивать его количество", async ({browser}) => {
        browser.setWindowSize(1366, 768);
        await browser.url("/hw/store/cart");

        const countBefore = browser.$(".Cart-Count");

        assert.equal(
            await countBefore.getText(),
            1,
            "В корзине должно быть 1 штука товара"
        );


        await browser.url("/hw/store/catalog/0");
        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click()

        await browser.url("/hw/store/cart");
        const countAfter = browser.$(".Cart-Count");

        assert.equal(
            await countAfter.getText(),
            2,
            "В корзине количество должно увеличиться до 2"
        );
    });
})