import React from 'react';
import {renderApp} from './utils/renderApp'
import {screen} from '@testing-library/react';


describe('Тестирование каталога', () => {
    const initState = {
        cart: {},
        products: [
            { id: 1, name: "товар1", price: 100 },
            { id: 2, name: "товар2", price: 100 },
        ],
        details: {}
    }

    it('В каталоге должны отображаться товары, список которых приходит с сервера(StubApi)', async () => {
        const {stubApi} = renderApp('/catalog', initState)

        await stubApi.getProducts()

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()
        expect(screen.queryByRole('heading', {name: 'товар2'})).toBeInTheDocument()
    })

    it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 300 },
                { id: 2, name: "товар2", price: 100 },
            ],
            details: {}
        }

        const {stubApi} = renderApp('/catalog', initState)

        await stubApi.getProducts()

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()
        expect(screen.queryByText('$300')).toBeInTheDocument()

        expect(screen.queryByRole('heading', {name: 'товар2'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()

        expect(screen.queryAllByRole('link', {name: /Details/i})).toHaveLength(2)
    })

    it ('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', async () => {
        const initState = {
            cart: {
                1:{ id: 1, name: "товар1", price: 100, count: 4}
            },
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
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

        const {stubApi} = renderApp('/catalog', initState)

        await stubApi.getProducts()

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })
})