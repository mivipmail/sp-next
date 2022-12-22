import React, {useEffect, useState} from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import {CartTitle} from "../common/title/Title";
import CartSummary from "./CartSummary";
import {API} from "../../api/api";
import {CONSTS} from "../../definitions/consts";

const CartTerms = (props) => {
    let [warning, setWarning] = useState(false)

    let [delivery, onSetDelivery] = useState(null)
    let [payment, onSetPayment] = useState(null)

    useEffect(() => {
        onSetDelivery(props.getDelivery())
        onSetPayment(props.getPayment())
    }, [])

    const onSubmit = (e = null) => {
        if(delivery === CONSTS.CD_COURIER_CDEK && !props.courierCity.courierPrice)
            setWarning(true)
        else {
            props.setDelivery(delivery)
            props.setPayment(payment)
            props.onSubmit(e)
        }
    }

    return (
        <div className="col-12 col-md-9 pb-5">
            <CartTitle step={CONSTS.CHECKOUT_STEPS.TERMS}/>

            <div className="row">

                <div className="col-12 col-lg-8 pb-5">
                    <div className="checkout_details_area clearfix">

                        <div className="cart-title">
                            <h5>Cпособы оплаты</h5>
                        </div>

                        <div className="row mb-5">
                            <div className="col-12">
                                <div className="custom-control custom-radio d-block mb-2 p-2 pl-5"
                                     style={payment === CONSTS.CD_AFTERPAY ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetPayment(CONSTS.CD_AFTERPAY)}>
                                    <input type="radio"
                                           checked={payment === CONSTS.CD_AFTERPAY}
                                           onChange={() => {}}
                                           name="payment" className="custom-control-input" id="payment1" />
                                    <label className="custom-control-label" htmlFor="payment1">
                                        Оплата при получении заказа
                                    </label>
                                </div>
                                <div className="custom-control custom-radio d-block p-2 pl-5"
                                     style={payment === CONSTS.CD_INVOICE ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetPayment(CONSTS.CD_INVOICE)}>
                                    <input type="radio"
                                           checked={payment === CONSTS.CD_INVOICE}
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
                                     style={delivery === CONSTS.CD_PICKUP_CDEK ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => {
                                         onSetDelivery(CONSTS.CD_PICKUP_CDEK)
                                         setWarning(false)
                                     }}>
                                    <input type="radio"
                                           checked={delivery === CONSTS.CD_PICKUP_CDEK}
                                           onChange={() => {}}
                                           name="delivery" className="custom-control-input" id="delivery2" />
                                    <label className="custom-control-label" htmlFor="delivery2">
                                        Доставка в пункт самовывоза
                                    </label>
                                    <span className="custom-control-price d-inline-block float-right">{CONSTS.PICKUP_PRICE} руб.</span>
                                </div>
                                <div className="custom-control custom-radio d-block p-2 pl-5"
                                     style={delivery === CONSTS.CD_COURIER_CDEK ? {backgroundColor: '#F2F4F7'} : null}
                                     onClick={() => onSetDelivery(CONSTS.CD_COURIER_CDEK)}>
                                    <input type="radio"
                                           checked={delivery === CONSTS.CD_COURIER_CDEK}
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

