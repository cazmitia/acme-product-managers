import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_MANAGERS = 'GOT_MANAGERS'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
const initialState = {products: [], managers: []}


const gotProductsFromServer = (products) => ( {
    type: GOT_PRODUCTS,
    products
})

const gotManagersFromServer = (managers) => ({
    type: GOT_MANAGERS,
    managers
})

// const updatedProductOnServer = (product) => ({
//     type: UPDATED_PRODUCT,
//     product
// })

export const getProducts = () => {
    return (dispatch) => {
        return axios.get('/api/products')
        .then(response => response.data)
        .then(products => gotProductsFromServer(products))
        .then(action => dispatch(action))
        .catch(e => console.log('error getting products from sever: ', e))
    }
}

export const getManagers = () => (
    (dispatch) => {
    return axios.get('/api/managers')
    .then(response => response.data)
    .then(managers => gotManagersFromServer(managers))
    .then(action => dispatch(action))
    .catch(e => console.log('error getting managers from server: ', e))
    }
)

export const updateProduct = ((productId, newManagerId) => {
    console.log(`updating productId: ${productId}, newManagerId: ${newManagerId}`)
    return dispatch => {
        return axios.put(`/api/products/${productId}`, {newManagerId} )
        .then(() => axios.get('/api/products'))
        .then(response => response.data)
        .then(products => gotProductsFromServer(products))
        .then(action => dispatch(action))
        // .then(response => response.data)
        // .then(product => updatedProductOnServer(product))
        // .then(action => dispatch(action))
        .catch(e => console.log('error updating manager: ', e))
    }
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_PRODUCTS: {
            return {...state, products: action.products}
        }
        case GOT_MANAGERS: {
            return {...state, managers: action.managers}
        }
        // case UPDATED_PRODUCT: {
        //     const newProducts = state.products.map(product => {
        //         if (product.id === action.product.id) product.managerId = action.product.managerId;
        //         return product
        //     })
        //     return {...state, products: newProducts}
        // }
        default: return state
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store
