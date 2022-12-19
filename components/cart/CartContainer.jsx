import * as React from 'react';
import {useEffect, useReducer, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {withLocalStorage} from "../../hocs/withLocalStorage";
import {sendOrder} from "../../redux/cart-reducer";
import {headerActions, saveCity} from "../../redux/header-reducer";
import PickupAddress from "./PickupAddress";
import Checkout from "./Checkout";
import CartList from "./CartList";
import CourierAddress from "./CourierAddress";
import CartTerms from "./CartTerms";
import {formatPhone} from "../../utils/helpers";
import Message from "../common/message/Message";
import {CONSTS} from "../../definitions/consts";
import {getCartCount, getCity} from "../../redux/header-selectors";
import {useRouter} from "next/router";


const CartContainer = (props) => {
    const router = useRouter()

    let [cart, onSetCart] = useState([])
    let [cartSum, onSetCartSum] = useState(null)
    let [deliveryPrice, onSetDeliveryPrice] = useState(null)
    let [delivery, onSetDelivery] = useState(null)
    let [payment, onSetPayment] = useState(null)

    let [courierCity, setCourierCity] = useState(CONSTS.INITIAL_COURIER_CITY)


    useEffect(() => {
        setCourierCity(props.getCourierCity())
    }, [])

    useEffect(() => {
        const cart = props.loadCart()
        onSetCart([...cart])
    }, [props.cartCount])

    useEffect(() => {
        const getCartSum =
            () => cart.reduce((currentCount, item) => currentCount + Number(item.price) * Number(item.quantity), 0)

        onSetCartSum(getCartSum())
    }, [cart])

    useEffect(() => {
        const getDeliveryPrice = (delivery) => {
            if (props.step > 0) {
                if (delivery === 2)
                    return CONSTS.PICKUP_PRICE
                else if (delivery === 1 && courierCity.id)
                    return courierCity.courierPrice
            }
            return null
        }

        const isAddressDefined = (delivery) => {
            return (delivery === 1 && props.getAddress()) || (delivery === 2 && props.getParcelShopCode())
        }

        const payment = props.getPayment()
        onSetPayment(payment)

        const delivery = props.getDelivery()
        onSetDelivery(delivery)

        const deliveryPrice = getDeliveryPrice(delivery)
        onSetDeliveryPrice(deliveryPrice)

        if(props.step > 3)
            router.push('/cart')
        else if (props.step && cartSum === 0)
            router.push('/cart')
        else if (props.step && props.step === 3 && !isAddressDefined(delivery))
            router.push('/cart')
    }, [props.step])

    const onSetCourierCity = (courierCity) => {
        setCourierCity(courierCity)
        props.setCourierCity(courierCity)
    }

    const onSubmit = (e = null) => {
        if (e)
            e.target.blur()
        router.push(`/cart/${props.step + 1}`)
    }

    const onBack = (e) => {
        if (e)
            e.target.blur()
        let back = props.step - 1
        if (back)
            router.push(`/cart/${back}`)
        else
            router.push(`/cart`)
    }

    const onSubmitOrder = (formData) => {
        const order = {
            surname: formData.surname,
            name: formData.name,
            phone: formatPhone(formData.phone),
            email: formData.email,
            comment: formData.comment ? formData.comment : '',
            city: props.city,
            payment: props.getPayment(),
            delivery: props.getDelivery(),
            delivery_price: deliveryPrice,
            address: (delivery === 2) ? props.getParcelShopCode() : props.getAddress(),
            orderItems: cart,
        }

        const fd = new FormData
        fd.append('data', JSON.stringify(order))
        if (formData.file)
            fd.append('file', formData.file)

        props.sendOrder(fd).then(data => {
            props.resetCart()
            props.saveCity(props.city)
            router.push(`/thankyou`)
        })
    }


    switch (props.step) {
        case 1:
            return <CartTerms cartSum={cartSum} deliveryPrice={deliveryPrice} onSubmit={onSubmit} onBack={onBack}
                              cities={props.cities} saveCity={props.saveCity}
                              getPayment={props.getPayment} setPayment={props.setPayment}
                              getDelivery={props.getDelivery} setDelivery={props.setDelivery}
                              pickupPrice={CONSTS.PICKUP_PRICE}
                              courierCity={courierCity} onSetCourierCity={onSetCourierCity}
                              step={props.step}/>
        case 2:
            if (delivery === 2)
                return <PickupAddress cartSum={cartSum} deliveryPrice={deliveryPrice} onSubmit={onSubmit} onBack={onBack}
                                      addresses={props.addresses}
                                      setParcelShopCode={props.setParcelShopCode}
                                      step={props.step}/>
            else
                return <CourierAddress cartSum={cartSum} deliveryPrice={deliveryPrice} onSubmit={onSubmit} onBack={onBack}
                                       getAddress={props.getAddress} setAddress={props.setAddress}
                                       courierCity={courierCity}
                                       step={props.step}/>
        case 3:
            return <Checkout cartSum={cartSum} deliveryPrice={deliveryPrice} onSubmit={onSubmitOrder} onBack={onBack}
                             payment={payment}
                             step={props.step}/>
        default:
            if (!cart || cart.length === 0) {
                return <Message title={CONSTS.CART_TITLE} message={CONSTS.CART_EMPTY_MSG}/>
            }
            return <CartList cartSum={cartSum} deliveryPrice={null} onSubmit={onSubmit} onBack={null}
                             products={props.products} streetsignColors={props.streetsignColors}
                             incrementItemQty={props.incrementItemQty} decrementItemQty={props.decrementItemQty}
                             cart={cart}/>
    }

}

let mapStateToProps = (state) => {
    return {
        cartCount: getCartCount(state),
        city: getCity(state),
    }
}

export default connect(mapStateToProps, {
        sendOrder,
        saveCity,
        setCartCount: headerActions.setCartCount,
})(withLocalStorage(CartContainer))

