import { render } from '@testing-library/react';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Application } from '../../../src/client/Application';
import { initStore } from '../../../src/client/store';
import { CartState } from '../../../src/common/types'
import { ApplicationState } from '../../../src/client/store';

export class StubAPi {
    public products: any

    constructor(products: any) {
        this.products = products;
    }

    async getProducts() {
        return {data: this.products};
    }

    async getProductById() {
        return {data: {
            id: 1,
            name: "товар1",
            price: 100,
            description: "Крутой товар",
            material: "Рубироид",
            color: "красный",
        }};
    }

    async checkout(from: any, cart: any) {
        return {data:{id: 1}}
    }
}

class StubCartApi {
    public state: CartState

    constructor(state: CartState) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setState(cart: CartState) {
        this.state = cart;
    }
}

export const renderApp = (route = '/', state: ApplicationState = {products: [], cart: {}, details: {}}) => {
    const cart = new StubCartApi(state.cart)
    const stubApi: any = new StubAPi(state.products)

    const store = initStore(stubApi, cart)

    const application = (
        <MemoryRouter initialEntries={[route]} >
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    return {...render(application), store, stubApi, cart}
}