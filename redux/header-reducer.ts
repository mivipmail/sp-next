import {API} from "../api/api";
import {
    AddressType,
    BaseCityType,
    CategoryType,
    CompanyType, OrderDataType,
    ProductType,
    StreetsignColorType,
    StreetsignType
} from "../consts/types";
import {InferActionTypes, StateType} from "./store";
import {ThunkAction} from "redux-thunk";

const SET_CITY = 'SET_CITY'
const SET_CITIES = 'SET_CITIES'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_STREETSIGNS = 'SET_STREETSIGN'
const SET_STREETSIGN_COLORS = 'SET_STREETSIGN_COLORS'
const SET_ADDRESSES = 'SET_ADDRESSES'
const SET_COMPANY = 'SET_COMPANY'
const SET_CART_COUNT = 'SET_CART_COUNT'

const initialState = {
    cities: [] as Array<BaseCityType>,
    categories: [] as Array<CategoryType>,
    products: [] as Array<ProductType>,
    streetsigns: [] as Array<StreetsignType>,
    streetsignColors: [] as Array<StreetsignColorType>,
    addresses: [] as Array<AddressType>,
    company: null as CompanyType | null,
    cartCount: 0 as number,
    city: null as string | null,
}

type InitialStateType = typeof initialState

const headerReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_CITIES:
            return {
                ...state,
                cities: [...action.data]
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...action.data]
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: [...action.data]
            }
        case SET_STREETSIGNS:
            return {
                ...state,
                streetsigns: [...action.data],
            }
        case SET_STREETSIGN_COLORS:
            return {
                ...state,
                streetsignColors: [...action.data]
            }
        case SET_ADDRESSES:
            return {
                ...state,
                addresses: [...action.data],
            }
        case SET_COMPANY:
            return {
                ...state,
                company: {...action.data},
            }
        case SET_CART_COUNT:
            return {
                ...state,
                cartCount: action.value,
            }
        case SET_CITY:
            return {
                ...state,
                city: action.value,
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof headerActions>

export const headerActions = {
    setCities: (data: Array<BaseCityType>) => ({type: SET_CITIES, data: data} as const),
    setCategories: (data: Array<CategoryType>) => ({type: SET_CATEGORIES, data: data} as const),
    setProducts: (data: Array<ProductType>) => ({type: SET_PRODUCTS, data: data} as const),
    setStreetsigns: (data: Array<StreetsignType>) => ({type: SET_STREETSIGNS, data} as const),
    setStreetsignColors: (data: Array<StreetsignColorType>) => ({type: SET_STREETSIGN_COLORS, data} as const),
    setAddresses: (data: Array<AddressType>) => ({type: SET_ADDRESSES, data: data} as const),
    setCompany: (data: CompanyType) => ({type: SET_COMPANY, data: data} as const),
    setCartCount: (value: number) => ({type: SET_CART_COUNT, value} as const),
    setCity: (value: string) => ({type: SET_CITY, value} as const),
}

export const loadCity = (): ThunkAction<void, StateType, unknown, ActionType> =>
    (dispatch) => {
        let city = localStorage.getItem('city')
        if (!city) {
            const city = document.title.substring(document.title.indexOf('- ') + 2) //(document.getElementById('city') as HTMLElement).getAttribute('value')
            dispatch(saveCity(city))
        } else {
            city = JSON.parse(city)
            if(city)
                dispatch(headerActions.setCity(city))
        }
    }
export const saveCity = (city: string): ThunkAction<void, StateType, unknown, ActionType> =>
    (dispatch) => {
        localStorage.setItem('city', JSON.stringify(city))
        dispatch(headerActions.setCity(city))
    }

export const fetchCities = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getCities()
        dispatch(headerActions.setCities(data))
    }
export const fetchCategories = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getCategories()
        dispatch(headerActions.setCategories(data))
    }
export const fetchProducts = (categoryId: number | null = null): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getProducts(categoryId)
        dispatch(headerActions.setProducts(data))
    }
export const fetchStreetsigns = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getStreetsigns()
        dispatch(headerActions.setStreetsigns(data))
    }
export const fetchStreetsignColors = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getStreetsignColors()
        dispatch(headerActions.setStreetsignColors(data))
    }
export const fetchAddresses = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getAddresses()
        dispatch(headerActions.setAddresses(data))
    }
export const fetchCompany = (): ThunkAction<Promise<void>, StateType, unknown, ActionType> =>
    async (dispatch) => {
        const data = await API.getCompany()
        dispatch(headerActions.setCompany(data))
    }

export default headerReducer
