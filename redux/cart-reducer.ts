import {API} from "../api/api";
import {OrderDataType} from "../consts/types";
import {InferActionTypes, StateType} from "./store";
import {ThunkAction} from "redux-thunk";

const SET_MESSAGE = 'SET_MESSAGE'
const RESET_MESSAGE = 'RESET_MESSAGE'


const initialState = {
    cartMessage: null as string | null,
}

type InitialStateType = typeof initialState

const cartReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                cartMessage: action.value,
            }
        case RESET_MESSAGE:
            return {
                ...state,
                cartMessage: null,
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof cartActions>

export const cartActions = {
    setMessage: (value: string) => ({type: SET_MESSAGE, value} as const),
    resetMessage: () => ({type: RESET_MESSAGE} as const),
}

export const sendOrder = (data: OrderDataType): ThunkAction<void, StateType, unknown, ActionType> => (dispatch) => {
    API.sendOrder(data).then(data => {
        dispatch(showMessage(data.message))
    })
}

export const showMessage = (message: string): ThunkAction<void, StateType, unknown, ActionType> =>
    (dispatch) => {
        dispatch(cartActions.setMessage(message))
        setTimeout(() => dispatch(cartActions.resetMessage()), 1000)
    }


export default cartReducer
