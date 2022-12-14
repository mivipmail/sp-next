import {applyMiddleware, combineReducers, createStore} from "redux";
import constructorReducer from "./constructor-reducer";
import headerReducer from "./header-reducer";
import thunkMiddleware from 'redux-thunk'
import productReducer from "./product-reducer";
import cartReducer from "./cart-reducer";
// @ts-ignore
import { reducer as formReducer } from 'redux-form';
//import {createWrapper, HYDRATE} from "next-redux-wrapper"

let reducers = combineReducers({
    header: headerReducer,
    constructorPage: constructorReducer,
    product: productReducer,
    cart: cartReducer,
    form: formReducer,
})

// const reducer = (state: any, action: any) => {
//     if (action.type === HYDRATE) {
//         console.log('HYDRATE')
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload, // apply delta from hydration
//         };
//         if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//         return nextState;
//     } else {
//         return reducers(state, action)
//     }
// }

let storeCreator = () => createStore(reducers, applyMiddleware(thunkMiddleware))

export type StateType = ReturnType<typeof reducers>
export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

//export default store
//export const wrapper = createWrapper(storeCreator);
export default createStore(reducers, applyMiddleware(thunkMiddleware))