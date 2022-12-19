import * as React from "react";
import {useDispatch} from "react-redux";
import {headerActions} from "../redux/header-reducer";
import {CourierCityType, ItemCartType, StreetsignDataType} from "../definitions/types";
import {CONSTS} from "../definitions/consts";

export type LocalStorageType = {
    resetCart: () => void
    getParcelShopCode: () => string|null
    setParcelShopCode: (parcelShopCode: string) => void
    getAddress: () => string|null
    setAddress: (address: string) => void
    getCourierCity: () => CourierCityType
    setCourierCity: (courierCity: CourierCityType) => void
    getDelivery: () => number
    setDelivery: (delivery: number) => void
    getPayment: () => number
    setPayment: (payment: number) => void
    loadCart: () => Array<ItemCartType>
    addToCart: (dataToCart: ItemCartType) => void
    incrementItemQty: (id: number, key: number) => void
    decrementItemQty: (id: number, key: number) => void
    updateCartCount: () => void
}

export function withLocalStorage<WCP>(Component: React.ComponentType<WCP & LocalStorageType>) {
    const LocalStorageComponent: React.FC<WCP> = (props) => {
        const dispatch = useDispatch()
        const setCartCount = (count: number) => dispatch(headerActions.setCartCount(count))

        const resetCart = () => {
            localStorage.clear()
        }

        const getParcelShopCode = () => {
            let parcelShopCode = localStorage.getItem('parcelShopCode')
            return (parcelShopCode) ? parcelShopCode : null
        }

        const setParcelShopCode = (parcelShopCode: string) => {
            localStorage.setItem('parcelShopCode', parcelShopCode)
        }

        const getAddress = () => {
            let address = localStorage.getItem('address')
            return (address) ? address : null
        }

        const setAddress = (address: string) => {
            localStorage.setItem('address', address)
        }

        const getCourierCity = () => {
            let courierCityRow = localStorage.getItem('courierCity')
            if (!courierCityRow) {
                const lCourierCity = CONSTS.INITIAL_COURIER_CITY
                setCourierCity(lCourierCity)
                return lCourierCity
            }
            return JSON.parse(courierCityRow) as CourierCityType
        }

        const setCourierCity = (courierCity: CourierCityType) => {
            localStorage.setItem('courierCity', JSON.stringify(courierCity))
        }

        const getDelivery = () => {
            let deliveryRaw = localStorage.getItem('delivery')
            if (!deliveryRaw) {
                const delivery = CONSTS.INITIAL_DELIVERY
                setDelivery(delivery)
                return delivery
            }
            return JSON.parse(deliveryRaw) as number
        }

        const setDelivery = (delivery: number) => {
            localStorage.setItem('delivery', delivery.toString())
        }

        const getPayment = () => {
            let paymentRaw = localStorage.getItem('payment')
            if (!paymentRaw) {
                const payment = CONSTS.INITIAL_PAYMENT
                setPayment(payment)
                return payment
            }
            return JSON.parse(paymentRaw) as number
        }

        const setPayment = (payment: number) => {
            localStorage.setItem('payment', payment.toString())
        }

        const addToCart = (dataToCart: any) => {
            const cartRaw = localStorage.getItem('cart')
            if (!cartRaw) {
                localStorage.setItem('cart', JSON.stringify([dataToCart]))
                setCartCount(dataToCart.quantity)
            } else {
                let cart = JSON.parse(cartRaw) as Array<ItemCartType>
                if (!(dataToCart as StreetsignDataType).attributes) {
                    cart.forEach((productInCart: ItemCartType) => {
                        if (dataToCart && productInCart.product_id === dataToCart.product_id) {
                            productInCart.quantity += dataToCart.quantity
                            dataToCart = null
                        }
                    })
                }
                if (dataToCart)
                    Array.prototype.push.apply(cart, [dataToCart])
                localStorage.setItem('cart', JSON.stringify(cart))

                setCartCount(cart.reduce((currentCount, item) => currentCount + item.quantity, 0))
            }
        }

        const loadCart = () => {
            let cart = localStorage.getItem('cart')
            return (cart) ? JSON.parse(cart) : []
        }

        const updateCartCount = () => {
            const cart = loadCart()
            const cartCount = (cart) ? cart.reduce((currentCount: number, item: ItemCartType) => currentCount + item.quantity, 0) : 0
            setCartCount(cartCount)
        }

        const incrementItemQty = (id: number, key: number) => {
            const cart = loadCart()
            cart.forEach((productInCart: ItemCartType, keyProductInCart: number) => {
                if (productInCart.product_id === id && key === keyProductInCart)
                    productInCart.quantity++
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            setCartCount(cart.reduce((currentCount: number, item: ItemCartType) => currentCount + item.quantity, 0))
        }

        const decrementItemQty = (id: number, key: number) => {
            let cart = loadCart()
            cart.forEach((productInCart: ItemCartType, keyProductInCart: number) => {
                if (productInCart.product_id === id && key === keyProductInCart)
                    productInCart.quantity--
            })
            cart = cart.filter((el: ItemCartType) => el.quantity > 0)
            localStorage.setItem('cart', JSON.stringify(cart))
            setCartCount(cart.reduce((currentCount: number, item: ItemCartType) => currentCount + item.quantity, 0))
        }

        return <Component {...props as WCP}
                          resetCart={resetCart}
                          getParcelShopCode={getParcelShopCode}
                          setParcelShopCode={setParcelShopCode}
                          getAddress={getAddress}
                          setAddress={setAddress}
                          getCourierCity={getCourierCity}
                          setCourierCity={setCourierCity}
                          getDelivery={getDelivery}
                          setDelivery={setDelivery}
                          getPayment={getPayment}
                          setPayment={setPayment}
                          loadCart={loadCart}
                          addToCart={addToCart}
                          incrementItemQty={incrementItemQty}
                          decrementItemQty={decrementItemQty}
                          updateCartCount={updateCartCount}/>
    }

    return LocalStorageComponent
}
