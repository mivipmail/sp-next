import {StateType} from "./store";


export const getAppMessage = (state: StateType): string|null => {
    return state.cart.cartMessage
}
