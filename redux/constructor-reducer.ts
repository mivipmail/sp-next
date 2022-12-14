import {InferActionTypes} from "./store";

const SET_FON = 'SET_FON'
const SET_ID = 'SET_ID'
const SET_COLOR = 'SET_COLOR'
const TOGGLE_INVERT = 'TOGGLE_INVERT'
const SET_BASE = 'SET_BASE'
const TOGGLE_LUM = 'TOGGLE_LUM'
const TOGGLE_LAM = 'TOGGLE_LAM'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const RESET_QTY = 'RESET_QTY'
const SET_SIGN_TEXT = 'SET_SIGN_TEXT'

const initialState = {
    id: 653, //645,
    base: 'ПВХ',
    color: 0,
    invert: 0,
    lum: 0,
    lam: 0,
    sign: '',
    quantity: 1,
    fon: 1,
}

type InitialStateType = typeof initialState

const constructorReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_FON:
            return {
                ...state,
                fon: action.value
            }
        case SET_ID:
            return {
                ...state,
                id: action.value,
            }
        case SET_COLOR:
            return {
                ...state,
                color: action.value
            }
        case TOGGLE_INVERT:
            return {
                ...state,
                invert: Number(!state.invert)
            }
        case SET_BASE:
            return {
                ...state,
                base: action.value,
            }
        case TOGGLE_LUM:
            return {
                ...state,
                lum: Number(!state.lum)
            }
        case TOGGLE_LAM:
            return {
                ...state,
                lam: Number(!state.lam)
            }
        case INCREMENT_QTY:
            return {
                ...state,
                quantity: ++state.quantity,
            }
        case DECREMENT_QTY:
            return {
                ...state,
                quantity: (state.quantity === 1) ? state.quantity : --state.quantity,
            }
        case RESET_QTY:
            return {
                ...state,
                quantity: initialState.quantity,
            }
        case SET_SIGN_TEXT:
            return {
                ...state,
                sign: action.value
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof constructorActions>

export const constructorActions = {
    setFon: (value: number) => ({type: SET_FON, value} as const ),
    setId: (value: number) => ({type: SET_ID, value: value} as const ),
    setColor: (value: number) => ({type: SET_COLOR, value: value} as const ),
    toggleInvert: () => ({type: TOGGLE_INVERT} as const ),
    setBase: (value: string) => ({type: SET_BASE, value: value} as const ),
    toggleLum: () => ({type: TOGGLE_LUM} as const ),
    toggleLam: () => ({type: TOGGLE_LAM} as const ),
    incrementQty: () => ({type: INCREMENT_QTY} as const ),
    decrementQty: () => ({type: DECREMENT_QTY} as const ),
    resetQty: () => ({type: RESET_QTY} as const ),
    setSignText: (value: string) => ({type: SET_SIGN_TEXT, value} as const ),
}

export default constructorReducer
