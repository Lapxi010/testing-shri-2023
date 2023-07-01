import React from 'react';
import {renderApp} from './utils/renderApp'
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Тестирование страницы Product', () => {
    const initState = {
        cart: {
            1:{ id: 1, name: "товар1", price: 100, count: 4}
        },
        products: [
            { id: 1, name: "товар1", price: 100 },
        ],
        details: {
        1: {
            id: 1,
            name: "товар1",
            price: 100,
            description: "Крутой товар",
            material: "Рубироид",
            color: "красный",
        }}
    }

    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину', async () => {
        const {stubApi} = renderApp('/catalog/1', initState)

        await stubApi.getProductById()

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()
        expect(screen.queryByText('Крутой товар')).toBeInTheDocument()
        expect(screen.queryByText('Рубироид')).toBeInTheDocument()
        expect(screen.queryByText('красный')).toBeInTheDocument()
        expect(screen.queryByText('Add to Cart')).toBeInTheDocument()
    })

    it ('Если товар уже добавлен в корзину, на странице должно отображаться сообщение об этом', async () => {
        const {stubApi} = renderApp('/catalog/1', initState)

        await stubApi.getProductById()

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })

    it ('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
        const {stubApi, store} = renderApp('/catalog/1', initState)

        await stubApi.getProductById()

        const btn: any = screen.queryByRole('button', {name: 'Add to Cart'});

        await userEvent.click(btn)

        expect(store.getState().cart['1'].count + 1).toBe(6)
    })

    it ('Размер кнопки добавление нужно размера', async () => {
        const {stubApi, store} = renderApp('/catalog/1', initState)

        await stubApi.getProductById()

        const btn: any = screen.queryByRole('button', {name: 'Add to Cart'});

        expect(btn.classList).toContain('btn-lg');
    })
})