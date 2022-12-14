import React, {useState} from 'react';
import s from './Top.module.css';
import Link from "next/link";
import {getCartCount, getCity} from "../../redux/header-selectors";
import {connect} from "react-redux";
import {saveCity} from "../../redux/header-reducer";
import ModalCities from "./ModalCities";


function Top(props) {
    let [modalActive, setModalActive] = useState(false)

    return (
        <div className="container-fluid sticky-top">
            <div className={`row pb-1 px-xl-5 ${s.blue}`}>
                <div className="col-12 col-sm-7">
                    <div className="d-inline-flex w-100 align-items-center">
                        <span className={"text-sm text-white text-decoration-none " + s.topRef}
                           onClick={() => {
                               setModalActive(true)
                               document.getElementById('modalCities').scrollTop = 0
                           }}><i className="fa fa-map-marker"></i> {props.city}</span>
                        <span className={"text-light px-2 " + s.topRef}>|</span>
                        <Link href={`/addresses`} className={"text-sm text-white text-decoration-none " + s.topRef}>
                            {/*<i className="fa fa-map-marker d-md-none"></i> */}
                            <span className="d-md-inline-block">Пункты самовывоза</span>
                        </Link>
                        <a href={`callto:${props.company && props.company.phone_href}`} className={"d-none d-sm-inline ml-auto mr-lg-5 text-sm text-white text-decoration-none " + s.topRef}>
                            <i className="fa fa-phone d-none d-sm-inline"></i> <span className="d-sm-none d-md-inline">{props.company && props.company.phone}</span>
                        </a>
                        <Link href={`/cart`} className={"d-sm-none ml-auto text-sm text-white " + s.topRef}>
                            <i className="fa fa-shopping-cart"></i> {props.cartCount}
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-5 text-right">
                    <div className="d-inline-flex w-100 align-items-center justify-content-between">
                        <Link href={`/terms`} className={"text-sm text-white ml-sm-5 " + s.topRef}>
                            Доставка и оплата
                        </Link>
                        <Link href={`/cart`} className={"d-none d-sm-inline text-sm text-white " + s.topRef}>
                            <i className="fa fa-shopping-cart"></i> {props.cartCount}
                        </Link>
                        <a href={`callto:${props.company && props.company.phone_href}`} className={"d-sm-none ml-auto mr-lg-5 text-sm text-white text-decoration-none " + s.topRef}>
                            <i className="fa fa-phone d-none d-sm-inline"></i> <span className="d-sm-none d-md-inline">{props.company && props.company.phone}</span>
                        </a>
                    </div>
                </div>
            </div>


            <ModalCities cities={props.cities}
                         saveCity={props.saveCity}
                         active={modalActive}
                         setActive={setModalActive} />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        cartCount: getCartCount(state),
        city: getCity(state),
    }
}

export default connect(mapStateToProps, {
    saveCity,
})(Top)

