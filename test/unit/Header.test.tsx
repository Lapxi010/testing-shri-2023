import React from 'react';
import {renderApp} from './utils/renderApp'
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Тестирование Header', () => {
    it('В приложение есть шапка', () => {
        const {container} = renderApp()

        const navbar = container.querySelector('.navbar');

        expect(navbar).toBeInTheDocument();
    });

    describe('Тестирование Navbar', () => {
        it('В Navbar отображается ссылка на Сatalog', () => {
            renderApp()

            const link = screen.queryByRole('link', {name: /catalog/i})

            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', '/catalog')
        });

        it('В Navbar отображается ссылка на Delivery', () => {
            renderApp()

            const link = screen.queryByRole('link', {name: /delivery/i})

            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', '/delivery')
        });

        it('В Navbar отображается ссылка на Contacts', () => {
            renderApp()

            const link = screen.queryByRole('link', {name: /contacts/i})

            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', '/contacts')
        });

        it('В Navbar отображается ссылка на Cart', () => {
            renderApp()

            const link = screen.queryByRole('link', {name: /cart/i})

            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', '/cart')
        });
    })

    it('Название магазина в шапке должно быть ссылкой на главную страницу', () => {
        renderApp()

        const link = screen.queryByRole('link', {name: /Example store/i})

        expect(link).toHaveAttribute('href', '/')
    })

    it('При выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
        const {container} = renderApp()

        const btn: any = container.querySelector('.navbar-toggler');
        const menu: any = container.querySelector('.navbar-collapse');
        const link: any = screen.queryByRole('link', {name: 'Catalog'});

        await userEvent.click(btn);
        await userEvent.click(link);

        expect(menu.classList).toContain('collapse');
    })
});
