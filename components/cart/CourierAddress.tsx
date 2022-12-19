// @ts-ignore
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import CartSummary from "./CartSummary";
import Title from "../common/title/Title";
import {required} from "../../utils/validators";
import * as React from "react";
import {CourierCityType} from "../../definitions/types";
import {useEffect, useState} from "react";
import Input from "../common/FormControls/Input";

type OwnPropsType = {
    step: number
    cartSum: number
    deliveryPrice: number
    courierCity: CourierCityType

    onSubmit: () => void
    onBack: (e: any) => void
    getAddress: () => string
    setAddress: (address: string|null) => void
}

const CourierAddress: React.FC<OwnPropsType> = (props) => {
    let [address, onSetAddress] = useState(null as string|null)

    useEffect(() => {
        onSetAddress(props.getAddress())
    }, [])

    const onSubmit = (formData: any) => {
        onSetAddress(formData.address)
        props.setAddress(formData.address)
        props.onSubmit()
    }

    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={(props.step) ? `Оформление заказа (Шаг ${props.step} из 3)` : `Корзина товаров`}/>

            <AddressFormRedux onSubmit={onSubmit} onBack={props.onBack}
                              cartSum={props.cartSum} deliveryPrice={props.deliveryPrice}
                              city={props.courierCity.name}
                              // @ts-ignore
                              initialValues={{address: address}} />
        </div>
    )
}

type OwnAddressFormPropsType = {
    cartSum: number
    deliveryPrice: number
    city: string

    onBack: (e: any) => void
}

type AddressFormValuesType = {
    address: string
}

//type AddressFormFieldsType = keyof AddressFormValuesType

const AddressForm: React.FC<InjectedFormProps<AddressFormValuesType, OwnAddressFormPropsType> & OwnAddressFormPropsType> = (props) => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit} className="row">
            <div className="col-12 col-lg-8 pb-5">
                <div className="checkout_details_area clearfix">

                    <div className="cart-title">
                        <h5>Введите полный адрес для доставки курьером заказа</h5>
                    </div>

                    <div className="row my-md-5">
                        <div className="offset-md-3 col-md-6 mb-3">
                            <div className="custom-control px-0">
                                <label htmlFor="address">г. {props.city}</label>
                                <Field name="address" id="address" component={Input} type="text"
                                       validate={[required]}
                                       className="form-control"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <CartSummary cartSum={props.cartSum}
                         deliveryPrice={props.deliveryPrice}
                         btnValue={'Далее'} onBack={props.onBack} />

        </form>
    )
}

const AddressFormRedux = reduxForm<AddressFormValuesType, OwnAddressFormPropsType>({
    form: 'address'
})(AddressForm)


export default CourierAddress

