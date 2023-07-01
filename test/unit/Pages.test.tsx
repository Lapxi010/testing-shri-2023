import React from 'react';
import {renderApp} from './utils/renderApp'
import {screen} from '@testing-library/react';

describe('В магазине должно быть несколько страниц', () => {
    it('В магазине есть Home', () => {
        const {container} = renderApp();

        const page = container.querySelector('.Home');

        expect(page).toBeInTheDocument();
    });

    it('В магазине есть страница Catalog', () => {
        const {container} = renderApp('/catalog');

        const page = container.querySelector('.Catalog');

        expect(page).toBeInTheDocument();
    });

    it('В магазине есть страница условий Delivery', () => {
        const {container} = renderApp('/delivery');

        const page = container.querySelector('.Delivery');

        expect(page).toBeInTheDocument();
    });

    it('В магазине есть страница Contacts', () => {
        const {container} = renderApp('/contacts');

        const page = container.querySelector('.Contacts');

        expect(page).toBeInTheDocument();
    });
});