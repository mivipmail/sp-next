import React from 'react';
import HTMLReactParser from "html-react-parser";
import Title from "../common/title/Title";
import CartSummary from "./CartSummary";

const CartList = (props) => {

    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={(props.step) ? `Оформление заказа (Шаг ${props.step} из 3)` : `Корзина товаров`}/>

            <div className="row">

                <div className="col-12 col-lg-8 pb-5">
                    <div className="cart-table clearfix">
                        <table className="table table-responsive"
                               style={{overflow: `hidden`, outline: `currentcolor none medium`}}
                               tabIndex="1">
                            <thead>
                            <tr>
                                <th></th>
                                <th className="cart_product_desc">Наименование</th>
                                <th>Цена</th>
                                <th>Количество</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (props.cart && props.products.length) ? props.cart.map((item, key) => {
                                    let product = props.products.find((el) => el.id === item.product_id)
                                    const isStreetsign = (product) => product.class_id === 3
                                    const getColorId = (_item) => props.streetsignColors.find(el =>
                                        (el.RAL === _item.attributes.color || el.ORACAL === _item.attributes.color)).id

                                    return (<tr key={key}>
                                        <td className="cart_product_img">
                                            {isStreetsign(product) ?
                                                <a href={`/`}><img
                                                    src={product.images[getColorId(item)][item.attributes.invert]}
                                                    alt={product.title}/></a>
                                                :
                                                <a href={`product/${product.id}`}><img
                                                    src={product.images.find(el => el.is_main).thumbnail_path}
                                                    alt={HTMLReactParser(product.title)}/></a>
                                            }
                                        </td>
                                        <td className="cart_product_desc">
                                            <h5>{HTMLReactParser(product.title)}</h5>
                                            {isStreetsign(product) ?
                                                <div>{
                                                    `Надпись: ${item.attributes.sign}, тип: ${item.attributes.base ? item.attributes.base : 'эмаль'}, цвет: ${item.attributes.color}` +
                                                    ((item.attributes.base && item.attributes.color !== 10 && item.attributes.lum) ? `, световозврат` : ``) +
                                                    ((item.attributes.base && item.attributes.lam) ? `, ламинация` : ``)
                                                }</div>
                                                :
                                                <div>Арт. {product.product_code}</div>
                                            }
                                        </td>
                                        <td className="price">
                                            <span>{item.price} руб.</span>
                                        </td>
                                        <td className="quantity">
                                            <div className="qty-btn d-flex">
                                                {/*<p className="d-none d-md-inline-block">Кол-во</p>*/}
                                                <div className="quantity">
                                                    <input type="number" className="quantity-text" id="quantity"
                                                           step="1" min="1"
                                                           max="300" name="quantity" disabled={true}
                                                           value={item.quantity}/>
                                                    <span className="qty-minus"
                                                          onClick={() => props.decrementItemQty(item.product_id, key)}>
                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="qty-plus"
                                                          onClick={() => props.incrementItemQty(item.product_id, key)}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                }) : null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <CartSummary cartSum={props.cartSum}
                             deliveryPrice={props.deliveryPrice}
                             btnValue={'Оформить'}
                             onSubmit={props.onSubmit} onBack={props.onBack}/>

            </div>
        </div>
    )
}

export default CartList

