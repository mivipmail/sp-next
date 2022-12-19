import React, {useEffect, useState} from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import Title from "../common/title/Title";
import CartSummary from "./CartSummary";
import {API} from "../../api/api";

const CartTerms = (props) => {
    let [warning, setWarning] = useState(false)

    let [delivery, onSetDelivery] = useState(null)
    let [payment, onSetPayment] = useState(null)

    useEffect(() => {
        onSetDelivery(props.getDelivery())
        onSetPayment(props.getPayment())
    }, [])

    const onSubmit = (e = null) => {
        if(delivery === 1 && !props.courierCity.courierPrice)
            setWarning(true)
        else {
            props.setDelivery(delivery)
            props.setPayment(payment)
            props.onSubmit(e)
        }
    }

    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={(props.step) ? `Оформление заказа (Шаг ${props.step} из 3)` : `Корзина товаров`}/>

            <div className="row">

                <div className="col-12 col-lg-8 pb-5">
                    <div className="checkout_details_area clearfix">

                        <div className="cart-title">
                            <h5>Cпособы оплаты</h5>
                        </div>

                        <div className="row mb-5">
                            <div className="col-12">
                                <div className="custom-control custom-radio d-block mb-2 p-2 pl-5"
                                     style={payment === 1 ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetPayment(1)}>
                                    <input type="radio"
                                           checked={payment === 1}
                                           onChange={() => {}}
                                           name="payment" className="custom-control-input" id="payment1" />
                                    <label className="custom-control-label" htmlFor="payment1">
                                        Оплата при получении заказа
                                    </label>
                                </div>
                                <div className="custom-control custom-radio d-block p-2 pl-5"
                                     style={payment === 2 ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetPayment(2)}>
                                    <input type="radio"
                                           checked={payment === 2}
                                           onChange={() => {}}
                                           name="payment" className="custom-control-input" id="payment2" />
                                    <label className="custom-control-label" htmlFor="payment2">
                                        Безналичная предоплата по счету (для юр. лиц)
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="cart-title">
                            <h5>Доступные способы доставки</h5>
                        </div>

                        <div className="row mb-5">
                            <div className="col-12">
                                <div className="custom-control custom-radio d-block mb-2 p-2 pl-5"
                                     style={delivery === 2 ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => {
                                         onSetDelivery(2)
                                         setWarning(false)
                                     }}>
                                    <input type="radio"
                                           checked={delivery === 2}
                                           onChange={() => {}}
                                           name="delivery" className="custom-control-input" id="delivery2" />
                                    <label className="custom-control-label" htmlFor="delivery2">
                                        Доставка в пункт самовывоза
                                    </label>
                                    <span className="custom-control-price d-inline-block float-right">{props.pickupPrice} руб.</span>
                                </div>
                                <div className="custom-control custom-radio d-block p-2 pl-5"
                                     style={delivery === 1 ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetDelivery(1)}>
                                    <input type="radio"
                                           checked={delivery === 1}
                                           onChange={() => {}}
                                           name="delivery" className="custom-control-input" id="delivery1" />
                                    <label className="custom-control-label" htmlFor="delivery1">
                                    <span className="d-inline-block mb-2">Курьерская доставка <br/>(для рассчета стоимости точно
                                        укажите <span className="font-bold second-color">город</span> или <span className="font-bold second-color">населенный пункт</span>)
                                    </span>
                                        <SelectSearch className={(warning ? `input-error ` : ``) + `select-search`} options={props.courierCity.id ? [{value: props.courierCity.id, name: props.courierCity.name}] : []}
                                                      value={props.courierCity.id}
                                                      onChange={(valueId, selectedOption) => {
                                                          API.getCourierCityPrice(valueId)
                                                              .then(price => {
                                                                  if(price) {
                                                                      props.onSetCourierCity({
                                                                          id: selectedOption.value,
                                                                          name: selectedOption.name,
                                                                          courierPrice: price
                                                                      })
                                                                      if(props.cities.find(el => el.city === selectedOption.name))
                                                                          props.saveCity(selectedOption.name)
                                                                      setWarning(false)
                                                                  }
                                                              })
                                                      }}
                                                      search={true}
                                                      getOptions={(query) => {
                                                          return new Promise((resolve, reject) => {
                                                              if(query.length > 1)
                                                                  API.getCourierCities(query)
                                                                      .then((response) => {
                                                                          resolve(response.map(({ id, city }) => ({
                                                                              value: id,
                                                                              name: city
                                                                          })));
                                                                      })
                                                                      .catch(reject);
                                                              else
                                                                  return reject
                                                          });
                                                      }}
                                                      name="city" placeholder="..." />
                                        {warning &&
                                            <span className="form-control-error">Пожалуйста, укажите город</span>
                                        }
                                    </label>
                                    <span className={`custom-control-price d-inline-block float-right ${warning ? 'form-control-error' : ''}`}>
                                {props.courierCity.courierPrice ? props.courierCity.courierPrice : '---'} руб.
                            </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <CartSummary cartSum={props.cartSum}
                             deliveryPrice={props.deliveryPrice}
                             btnValue={'Далее'}
                             onSubmit={onSubmit} onBack={props.onBack} />

            </div>
        </div>
    )
}

export default CartTerms

