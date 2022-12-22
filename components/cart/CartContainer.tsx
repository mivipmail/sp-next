import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LocalStorageType, withLocalStorage} from "../../hocs/withLocalStorage";
import {sendOrder} from "../../redux/cart-reducer";
import {saveCity} from "../../redux/header-reducer";
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
import {
    AddressType,
    BaseCityType,
    CourierCityType,
    ItemCartType,
    OrderType,
    ProductType,
    StreetsignColorType
} from "../../definitions/types";

type OwnPropsType = {
    cities: BaseCityType[]
    products: ProductType[]
    streetsignColors: StreetsignColorType[]
    addresses: AddressType[]
    step: number
}

const CartContainer: React.FC<OwnPropsType & LocalStorageType> = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const cartCount = useSelector(getCartCount)
    const city = useSelector(getCity)

    let [cart, onSetCart] = useState([] as ItemCartType[])
    let [cartSum, onSetCartSum] = useState(null as number|null)
    let [deliveryPrice, onSetDeliveryPrice] = useState(null as number|null)
    let [delivery, onSetDelivery] = useState(null as number|null)
    let [payment, onSetPayment] = useState(null as number|null)
    let [courierCity, setCourierCity] = useState(CONSTS.INITIAL_COURIER_CITY)

    useEffect(() => {
        setCourierCity(props.getCourierCity())
    }, [])

    useEffect(() => {
        const cart = props.loadCart()
        onSetCart([...cart])
    }, [cartCount])

    useEffect(() => {
        const getCartSum =
            () => cart.reduce((currentCount, item) => currentCount + Number(item.price) * Number(item.quantity), 0)

        onSetCartSum(getCartSum())
    }, [cart])

    useEffect(() => {
        const getDeliveryPrice = (delivery: number) => {
            if (props.step > CONSTS.CHECKOUT_STEPS.CART) {
                if (delivery === CONSTS.CD_PICKUP_CDEK)
                    return CONSTS.PICKUP_PRICE
                else if (delivery === CONSTS.CD_COURIER_CDEK && courierCity.id)
                    return courierCity.courierPrice
            }
            return null
        }

        const isAddressDefined = (delivery: number) => {
            return (delivery === CONSTS.CD_COURIER_CDEK && props.getAddress())
                || (delivery === CONSTS.CD_PICKUP_CDEK && props.getParcelShopCode())
        }

        const payment = props.getPayment()
        onSetPayment(payment)

        const delivery = props.getDelivery()
        onSetDelivery(delivery)

        const deliveryPrice = getDeliveryPrice(delivery)
        onSetDeliveryPrice(deliveryPrice)

        if(
            (props.step > CONSTS.CHECKOUT_STEPS.CHECKOUT) ||
            (props.step && cartSum === 0) ||
            (props.step && props.step === CONSTS.CHECKOUT_STEPS.CHECKOUT && !isAddressDefined(delivery))
        )
            router.push('/cart')

    }, [props.step])

    const onSetCourierCity = (courierCity: CourierCityType) => {
        setCourierCity(courierCity)
        props.setCourierCity(courierCity)
    }

    const onSubmit = (e: any = null) => {
        e?.target.blur()
        router.push(`/cart/${props.step + 1}`)
    }

    const onBack = (e: any) => {
        e?.target.blur()
        let back = props.step - 1
        if (back)
            router.push(`/cart/${back}`)
        else
            router.push(`/cart`)
    }

    const onSubmitOrder = (formData: any) => {
        const order: OrderType = {
            surname: formData.surname,
            name: formData.name,
            phone: formatPhone(formData.phone),
            email: formData.email,
            comment: formData.comment ? formData.comment : '',
            city: city as string,
            payment: props.getPayment(),
            delivery: props.getDelivery(),
            delivery_price: deliveryPrice as number,
            address: (delivery === CONSTS.CD_PICKUP_CDEK ? props.getParcelShopCode() : props.getAddress()) as string,
            orderItems: cart,
        }

        const fd = new FormData
        fd.append('data', JSON.stringify(order))
        if (formData.file)
            fd.append('file', formData.file)

        // @ts-ignore
        dispatch(sendOrder(fd)).then(data => {
            props.resetCart()
            // @ts-ignore
            dispatch(saveCity(city))
            router.push(`/thankyou`)
        })
    }

    const commonProps = {
        cartSum: cartSum as number,
        deliveryPrice,
        onSubmit, onBack
    }

    switch (props.step) {
        case CONSTS.CHECKOUT_STEPS.TERMS:
            // @ts-ignore
            return <CartTerms {...commonProps} saveCity={(city: string) => dispatch(saveCity(city))}
                              getPayment={props.getPayment} setPayment={props.setPayment}
                              getDelivery={props.getDelivery} setDelivery={props.setDelivery}
                              courierCity={courierCity} onSetCourierCity={onSetCourierCity}
                              cities={props.cities} />

        case CONSTS.CHECKOUT_STEPS.ADDRESS:
            if (delivery === CONSTS.CD_PICKUP_CDEK)
                return <PickupAddress {...commonProps}
                                      addresses={props.addresses} setParcelShopCode={props.setParcelShopCode} />
            else
                return <CourierAddress {...commonProps}
                                       getAddress={props.getAddress} setAddress={props.setAddress}
                                       courierCity={courierCity} />

        case CONSTS.CHECKOUT_STEPS.CHECKOUT:
            return <Checkout cartSum={cartSum} deliveryPrice={deliveryPrice} onSubmit={onSubmitOrder} onBack={onBack}
                             payment={payment} />

        default:
            if (!cart || cart.length === 0)
                return <Message title={CONSTS.CART_TITLE} message={CONSTS.CART_EMPTY_MSG}/>

            return <CartList {...commonProps}
                             products={props.products} streetsignColors={props.streetsignColors}
                             incrementItemQty={props.incrementItemQty} decrementItemQty={props.decrementItemQty}
                             cart={cart}/>
    }

}

export default withLocalStorage(CartContainer)

