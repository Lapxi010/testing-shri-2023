import React from 'react';
import {renderApp} from './utils/renderApp'
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Тестировние корзины товаров', () => {
    const initState = {
            cart: {
                1:{ id: 1, name: "товар1", price: 150, count: 4},
                2:{ id: 2, name: "товар2", price: 200, count: 5 },
            },
            products: [
                { id: 1, name: "товар1", price: 150 },
                { id: 2, name: "товар2", price: 200 },
            ],
            details: {}
        }

    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
        renderApp('/cart', initState)

        expect(screen.queryByRole('link', { name: /Cart \(2\)/i})).toBeInTheDocument();
    })

    it('В корзине должна быть таблцицы с товарами', () => {
        const {container} = renderApp('/cart', initState)

        const table = container.querySelector('.Cart-Table');

        expect(table).toBeInTheDocument()
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', () => {
        renderApp('/cart', initState)

        expect(screen.queryByTestId('1')).toBeInTheDocument()
        expect(screen.queryByTestId('2')).toBeInTheDocument()
    })

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', () => {
        renderApp('/cart', initState)

        expect(screen.queryByText('товар1')).toBeInTheDocument()
        expect(screen.queryByText('4')).toBeInTheDocument()
        expect(screen.queryByText('$150')).toBeInTheDocument()
        expect(screen.queryByText('$600')).toBeInTheDocument()

        expect(screen.queryByText('товар2')).toBeInTheDocument()
        expect(screen.queryByText('5')).toBeInTheDocument()
        expect(screen.queryByText('$200')).toBeInTheDocument()
        expect(screen.queryByText('$1000')).toBeInTheDocument()

        expect(screen.queryByText('$1600')).toBeInTheDocument()
    })

    it('Есть кнопка очистить корзину', () => {
        renderApp('/cart', initState)

        const btn = screen.queryByRole('button', {name: 'Clear shopping cart'});

        expect(btn).toBeInTheDocument()
    })

    it('Нет кнопки очистить корзину', () => {
        renderApp('/cart')

        const btn = screen.queryByRole('button', {name: 'Clear shopping cart'});

        expect(btn).not.toBeInTheDocument()
    })

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        const {store} = renderApp('/cart', initState)

        const btn: any = screen.queryByRole('button', {name: 'Clear shopping cart'});

        await userEvent.click(btn);

        expect(btn).not.toBeInTheDocument()

        expect(store.getState().cart).toEqual({});
    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
        renderApp('/cart');

        const link = screen.queryByRole('link', {name: 'catalog'});

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/catalog')
    });

    it('содержимое корзины должно сохраняться между перезагрузками страницы', async () => {

    })

    it('Правильный alert после заполнений данных', async () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 150 },
                { id: 2, name: "товар2", price: 200 },
            ],
            details: {},
            latestOrderId: 1
        }
        const {container, stubApi} = renderApp('/cart', initState)

        // const btn: any = screen.queryByRole('button', {name: 'Checkout'});

        // const Name = screen.getByLabelText('Name')
        // const Phone = screen.getByLabelText('Phone')
        // const Address = screen.getByLabelText('Address')

        // await userEvent.type(Name, 'Kolya')
        // await userEvent.type(Phone, '+8900995532')
        // await userEvent.type(Address, 'Africa Nigeria')

        // await userEvent.click(btn)
        console.log(container.outerHTML)
        const alert: any = container.querySelector('.alert')

        expect(alert.classList).toContain('alert-success');
    })
})
