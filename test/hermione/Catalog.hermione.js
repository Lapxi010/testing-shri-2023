const { assert } = require('chai');

describe('Проверка каталога на функциональность', async () => {
    afterEach(async function ({browser}) {
        await browser.execute(() =>
            window.localStorage.removeItem("example-store-cart")
        );
    });

    it("Cодержимое корзины должно сохраняться между перезагрузками страницы;", async  function ({browser}) {
        await browser.setWindowSize(1366, 768);
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

    it("Если товар уже добавлен в корзину, повторное нажатие кнопки добавить в корзину должно увеличивать его количество", async function ({browser}) {
        await browser.setWindowSize(1366, 768);
        await browser.url("/hw/store/cart");

        const countBefore = browser.$(".Cart-Count");

        await browser.url("/hw/store/catalog/0");
        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click()

        await browser.url("/hw/store/cart");
        const countAfter = browser.$(".Cart-Count");

        assert.equal(
            await countBefore.getText(),
            1,
            "В корзине должно быть 1 штука товара"
        );
        await browser.refresh()
    });

    it('в каталоге должны отображаться товары, список которых приходит с сервера', async function ({browser})  {
        await browser.url('/hw/store/catalog');
        const cards = await browser.$$('.ProductItem.card');

        for(let i = 0; i < cards.length; i++){
            const card = cards[i]
            const name = await card.$('.ProductItem-Name.card-title').getText();
            if(!name) {
                assert.fail('Имя нет у продуктов')
            }
        }
        await browser.refresh()
    })

    it('Происходит верное отображение в катологе у карточки товара', async function ({browser}) {
        await browser.url('/hw/store/catalog/0');
        const name_first = await browser.$('.ProductDetails-Name').getText()

        await browser.url('/hw/store/catalog/1');
        const name_second = await browser.$('.ProductDetails-Name').getText()

        if(name_first === name_second) {
            assert.fail('Происходит не верное отображение у карточки товара')
        }

        await browser.refresh()
    })
})