import {StateType} from "./store";
import {StreetsignType} from "../definitions/types";
import {createSelector} from "reselect";
import {CONSTS} from "../definitions/consts";
import {getCategories, getStreetsigns} from "./header-selectors";

export const getStreetsignId = (state: StateType): number => {
    return state.constructorPage.id;
}

export const getStreetsign = createSelector(
    [getStreetsigns, getStreetsignId],
    (streetsigns, id): StreetsignType|undefined => {
    return streetsigns.find(el => el.id === id)
})

export const getStreetsignDiscount = createSelector(
    [getStreetsign, getCategories],
    (streetsign, categories): number => {
        const category = categories.find(el => el.id === streetsign?.category_id)
        return (category) ? category.discount : 0
    })

export const getBase = (state: StateType): string => {
    return state.constructorPage.base;
}

export const getLam = (state: StateType): number => {
    return state.constructorPage.lam;
}

export const getLum = (state: StateType): number => {
    return state.constructorPage.lum;
}

export const getColor = (state: StateType): number => {
    return state.constructorPage.color;
}

export const getStreetsignOldPrice = createSelector(
    [getStreetsign, getBase, getLam, getLum, getColor],
    (streetsign, base, lam, lum, color): number => {
    let price: number = 0;

    if(!streetsign)
        return price


    if(base === 'эмаль') {
        // @ts-ignore
        const priceClr: number = Number( ( (streetsign.price + streetsign.price_acp)/200 ).toFixed(0) ) * 100
        // @ts-ignore
        price = streetsign.price + streetsign.price_acp + streetsign.price_lum + streetsign.price_lam
            + priceClr;
    }
    else {
        const pricePlate = (base === 'АКП') ? streetsign.price_acp : 0;
        const priceLum = (!CONSTS.NOT_WHITE_BG_COLORS.includes(color) && lum) ? streetsign.price_lum : 0;
        const priceLam = lam ? streetsign.price_lam : 0;
        // @ts-ignore
        price = streetsign.price + pricePlate + priceLum + priceLam;
    }

    return price;
})

export const getStreetsignPrice = createSelector(
    [getStreetsignOldPrice, getStreetsignDiscount],
    (oldPrice, discount): number => {
        return Number(( (oldPrice*(100 - discount))/1000 ).toFixed(0)) * 10
        //return oldPrice - 300
    })


export const getInvert = (state: StateType): number => {
    return state.constructorPage.invert;
}

export const getFon = (state: StateType): number => {
    return state.constructorPage.fon;
}

export const getSign = (state: StateType): string => {
    return state.constructorPage.sign;
}

export const getStreetsignQuantity = (state: StateType): number => {
    return state.constructorPage.quantity;
}
