import React from 'react';
import {renderApp} from './utils/renderApp'
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { checkout } from '../../src/client/store';

describe('Проверка работы формы', () => {
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

    it('Проверка данных в форме работает', async () => {
        const {container, store} = renderApp('/cart', initState)

        await store.dispatch(checkout(
            {name: 'Vasya', phone: '+7900553331', address: 'dadaddadad'},initState.cart))

        const alert: any = container.querySelector('.alert')

        expect(alert).toBeInTheDocument()
    })

    it('Проверка валидности номера работает', async () => {
        renderApp('/cart', initState)

        const btn: any = screen.queryByRole('button', {name: 'Checkout'});

        const Phone = screen.getByLabelText('Phone')

        await userEvent.type(Phone, '+8900995532')

        await userEvent.click(btn)

        expect(Phone.classList).not.toContain('is-invalid');
    })
})