import { ActionTypes } from "../constants/action-types";

const initialState = {
    products: []
}

export const productReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state, products:payload}
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, selectedProduct:payload}
    
        default:
            return state
    }
}

// Selectors
export const getProducts = (state) => state.productReducer.products;
export const getSelectedProduct = (state) => state.productReducer.selectedProduct;