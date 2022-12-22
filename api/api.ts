import axios from "axios";
import {
    AddressType,
    BaseCityType,
    CategoryType, CompanyType,
    CourierCityType, OrderDataType,
    ProductType,
    StreetsignColorType,
    StreetsignType
} from "../definitions/types";
import {log} from "util";

const instance = axios.create({
    withCredentials: true, // кросс-доменные запросы
    //baseURL: `${ window.location.origin }/api/`,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Access-Control-Allow-Credentials': true,
    }
})

export const API = {
    getCategories(): Promise<Array<CategoryType>> {
        return instance.get<{ data: Array<CategoryType> }>(`categories`)
            .then((res) => {
                return res.data.data
            })
    },
    getProducts(categoryId: number | null = null) {
        return instance.get<{ data: Array<ProductType> }>((categoryId) ? `products?category_id=${categoryId}` : `products`)
            .then((res) => {
                return res.data.data
            })
    },
    getStreetsigns() {
        return instance.get<{ data: Array<StreetsignType> }>(`streetsigns`)
            .then((res) => {
                return res.data.data
            })
    },
    getStreetsignColors() {
        return instance.get<{ data: Array<StreetsignColorType> }>(`streetsigns/colors`)
            .then((res) => {
                return res.data.data
            })
    },
    getCities() {
        return instance.get<{ data: Array<BaseCityType> }>(`cities`)
            .then((res) => {
                return res.data.data
            })
    },
    getCity() {
        return instance.get<{ data: string }>(`cities/current`)
            .then((res) => {
                return res.data.data
            })
    },
    async getCourierCities(query: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}courier-cities?query=${query}`, {
            method: 'GET',
        })
        return await response.json()
    },
    async getCourierCityPrice(cityId: number) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}courier-cities/${cityId}/price`, {
            method: 'GET',
        })
        return await response.json()
    },
    getAddresses() {
        return instance.get<{ data: Array<AddressType> }>(`addresses`)
            .then((res) => {
                return res.data.data
            })
    },
    getCompany() {
        return instance.get<{ data: CompanyType }>(`constants/company`)
            .then((res) => {
                return res.data.data
            })
    },

    // currentBaseUrl is necessary for API request come from the same subdomain as pages
    // important for sessions work
    sendOrder(currentBaseUrl: string, data: any) {
        return fetch(`${currentBaseUrl}/api/cart`, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            })
    },
}

