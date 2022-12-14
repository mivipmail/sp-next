import {StateType} from "./store";
import {
    AddressType,
    BaseCityType,
    CategoryType, CompanyType,
    ProductType,
    StreetsignColorType,
    StreetsignType
} from "../consts/types";


export const getStreetsigns = (state: StateType): Array<StreetsignType> => {
    return state.header.streetsigns
}

export const getStreetsignColors = (state: StateType): Array<StreetsignColorType> => {
    return state.header.streetsignColors
}

export const getCategories = (state: StateType): Array<CategoryType> => {
    return state.header.categories
}

export const getProducts = (state: StateType): Array<ProductType> => {
    return state.header.products
}

export const getAddresses = (state: StateType): Array<AddressType> => {
    return state.header.addresses
}

export const getCities = (state: StateType): Array<BaseCityType> => {
    return state.header.cities
}

export const getCartCount = (state: StateType): number => {
    return state.header.cartCount
}

export const getCity = (state: StateType): string|null => {
    return state.header.city
}

export const getCompany = (state: StateType): CompanyType|null => {
    return state.header.company
}


