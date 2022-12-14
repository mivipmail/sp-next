import {ProductDataType, ProductType} from "../consts/types";
import {InferActionTypes} from "./store";

const SET_PRODUCT = 'SET_PRODUCT'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const RESET_QTY = 'RESET_QTY'

const initialState = {
    data: {
        product_id: null,
        price: 0,
        l: null,
        w: null,
        h: null,
        quantity: 1,
    } as ProductDataType,
    product: null as ProductType | null,
}

type InitialStateType = typeof initialState

const productReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                data: {
                    ...state.data,
                    product_id: action.data.id,
                    price: action.data.price,
                    l: action.data.l,
                    w: action.data.w,
                    h: action.data.h,
                    quantity: initialState.data.quantity,
                },
                product: {...action.data},
            }
        case INCREMENT_QTY:
            return {
                ...state,
                data: {
                    ...state.data,
                    quantity: ++state.data.quantity,
                },
            }
        case DECREMENT_QTY:
            return {
                ...state,
                data: {
                    ...state.data,
                    quantity: (state.data.quantity === 1) ? state.data.quantity : --state.data.quantity,
                },
            }
        case RESET_QTY:
            return {
                ...state,
                data: {
                    ...state.data,
                    quantity: initialState.data.quantity,
                }
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof productActions>

export const productActions = {
    setProduct: (data: ProductType) => ({type: SET_PRODUCT, data: data} as const ),
    incrementQty: () => ({type: INCREMENT_QTY} as const ),
    decrementQty: () => ({type: DECREMENT_QTY} as const ),
    resetQty: () => ({type: RESET_QTY} as const ),
}


export default productReducer
