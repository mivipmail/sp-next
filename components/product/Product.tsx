import React, {useState} from 'react';
import Title from "../common/title/Title";
import s from "./Product.module.css";
import Modal from "../common/modal/Modal";
import HTMLReactParser from 'html-react-parser'
import Image from "next/image";
import {CONSTS} from "../../definitions/consts";
import {ProductType} from "../../definitions/types";

type PropsType = {
    product: ProductType
    data: any

    onSubmit: (data: any, checkout: boolean) => void
    incrementQty: () => void
    decrementQty: () => void
}

const Product: React.FC<PropsType> = (props) => {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={HTMLReactParser(props.product.title ? props.product.title : '').toString()}/>

            <div className="row">
                <div className="col-12 col-lg-5 pb-5">
                    <div className={`single_product_thumb ${(props.product.images?.length ?? 0) > 1 ? 'mb-170' : ''}`}>
                        <div id="product_details_slider" className="carousel slide" data-ride="carousel">
                            {(props.product.images?.length ?? 0) > 1 &&
                                <ol className="carousel-indicators">
                                    <li className="active" data-target="#product_details_slider" data-slide-to="0"
                                        style={{backgroundImage: `url(${props.product.images?.find(el => el.is_main)?.thumbnail_path})`}}>
                                    </li>
                                    {/*<li data-target="#product_details_slider" data-slide-to="1"*/}
                                    {/*    style={{backgroundImage: 'url(http://splates/img/product-img/pro-big-2.jpg)'}}*/}
                                    {/*    className="">*/}
                                    {/*</li>*/}
                                </ol>
                            }
                            <div className="carousel-inner p-3" onClick={() => setModalActive(true)}>
                                <div className="carousel-item active">
                                    <Image className="d-block w-100"
                                           src={props.product.images?.find(el => el.is_main)?.path as string}
                                           width={CONSTS.PRODUCT_IMAGE.SIZE.W}
                                           height={CONSTS.PRODUCT_IMAGE.SIZE.H}
                                           alt="First slide"/>
                                </div>
                                {/*<div className="carousel-item">*/}
                                {/*    <img className="d-block w-100" src="../img/product-img/pro-big-2.jpg"*/}
                                {/*         alt="Second slide"/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-7">
                    <div className="single_product_desc">
                        <div className="product-meta-data">
                            <p className="product-price">{props.product.price} ??????.</p>
                            <p className="font-weight-light">??????.: #{props.product.product_code}</p>
                            {props.product.is_published
                                ?
                                <p className="avaibility"><i className="fa fa-circle"/> ?? ??????????????</p>
                                :
                                <p className="avaibility"><i className="fa fa-circle text-secondary"/> ?????? ?? ?????????????? ?????? ???????? ?? ??????????????</p>
                            }
                        </div>

                        <div className="short_overview my-5">
                            <div className={s.description}>{HTMLReactParser(props.product.description ? props.product.description : '')}</div>
                        </div>

                        <div className="cart clearfix">
                            <div className="cart-btn d-flex mb-50">
                                <p>????????????????????</p>
                                <div className="quantity">
                                    <span className="qty-minus"
                                          onClick={() => props.decrementQty()}
                                    ><i className="fa fa-caret-down" aria-hidden="true"/></span>
                                    <input type="number" className="qty-text" id="quantity"
                                           onChange={() => {}}
                                           value={props.data.quantity}
                                           name="quantity" />
                                    <span className="qty-plus"
                                          onClick={() => props.incrementQty()}
                                    ><i className="fa fa-caret-up" aria-hidden="true"/></span>
                                </div>
                            </div>
                            <button type="submit" name="addtocart" value="5"
                                    onClick={() => props.onSubmit(props.data, false)}
                                    className="btn amado-btn pull-left mb-15 mr-15">???????????????? ?? ??????????????
                            </button>
                            <button type="submit" name="buy" value="5"
                                    onClick={() => props.onSubmit(props.data, true)}
                                    className="btn amado-btn active">???????????????? ?? ????????????????
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <Modal active={modalActive}
                   setActive={setModalActive}
                   image={props.product.images?.find(image => image.is_main)?.path} />
        </div>
    )
}

export default Product

