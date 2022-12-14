import React, {useEffect} from 'react';
import 'react-select-search/style.css'
import Title from "../common/title/Title";
import CartSummary from "./CartSummary";
import {useSelector} from "react-redux";
import {getCity} from "../../redux/header-selectors";
import useMap from "../../hooks/useMap";


const PickupAddress = (props) => {

    return (
        <div className="col-12 col-md-9">
            <Title title={(props.step) ? `Оформление заказа (Шаг ${props.step} из 3)` : `Корзина товаров`}/>

            <div className="row">

                <div className="col-12 col-lg-8 pb-5">
                    <div className="checkout_details_area clearfix">
                        <div className="cart-title">
                            <h5>Выберите на карте удобный для получения пункт выдачи заказов</h5>
                        </div>

                        <AddressesComponent city={'Москва'} addresses={props.addresses} onSubmit={props.onSubmit} setParcelShopCode={props.setParcelShopCode} />

                    </div>
                </div>

                <CartSummary cartSum={props.cartSum}
                             deliveryPrice={props.deliveryPrice} onBack={props.onBack} />
            </div>
        </div>
    )
}

let AddressesComponent = (props) => {
    const city = useSelector(getCity)
    const map = useMap()

    const handleClickOutside = (event) => {
        if (event.target.nodeName === 'BUTTON' && event.target.title && event.target.title === 'Выбрать ПВЗ') {
            props.setParcelShopCode(event.target.id)
            props.onSubmit(event)
        }
    }

    useEffect(() => {
        if(city) {
            map.init(props.addresses, city, true)
            document.addEventListener('click', handleClickOutside, false);
        }

        return function cleanup() {
            document.removeEventListener('click', handleClickOutside, false);
        }
    }, [city])


    return (
        <div className="row mb-5">
            <div className="col-12">
                {map.jsxElement}
            </div>
        </div>
    )
}


export default PickupAddress

