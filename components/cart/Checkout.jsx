import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {CartTitle} from "../common/title/Title";
import CartSummary from "./CartSummary";
import {email, phone, required} from "../../utils/validators";
import Link from "next/link";
import Input from "../common/FormControls/Input";
import CheckboxCreator from "../common/FormControls/CheckboxCreator";
import {CONSTS} from "../../definitions/consts";

const Checkout = (props) => {
    return (
        <div className="col-12 col-md-9 pb-5">
            <CartTitle step={CONSTS.CHECKOUT_STEPS.CHECKOUT}/>

            <ContactFormRedux onSubmit={props.onSubmit}
                              payment={props.payment}
                              cartSum={props.cartSum} deliveryPrice={props.deliveryPrice} onBack={props.onBack}/>
        </div>
    )
}

const ContactForm = (props) => {
    const {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit} className="row">
            <div className="col-12 col-lg-8 pb-5">
                <div className="checkout_details_area clearfix">

                    <div className="cart-title">
                        <h5>Введите контактные данные получателя заказа</h5>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="custom-control px-0">
                                <label htmlFor="surname">Фамилия*</label>
                                <Field name="surname" component={Input}
                                       validate={[required]}
                                       type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="custom-control px-0">
                                <label htmlFor="name">Имя*, Отчество</label>
                                <Field name="name" component={Input}
                                       validate={[required]}
                                       type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="row custom-control px-0">
                                <div className="col-12 d-inline-block">
                                    <label htmlFor="phone">Мобильный телефон*</label>
                                </div>
                                <div className="col-2 d-inline-block text-right pr-0 float-left"
                                     style={{paddingTop: '23px'}}>
                                    <h6 className="text-secondary">+7</h6>
                                </div>
                                <div className="col-10 d-inline-block">
                                    <Field name="phone" component={Input}
                                           validate={[required, phone]}
                                           type="phone" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="custom-control px-0">
                                <label htmlFor="email">E-mail*</label>
                                <Field name="email" component={Input}
                                       validate={[required, email]}
                                       type="email" className="form-control"/>
                            </div>
                        </div>
                        {props.payment === 2 &&
                            <div className="col-12 mb-3">
                                <div className="custom-control px-0">
                                    <label htmlFor="file">Для выставления счета, пожалуйста, прикрепите файл с
                                        реквизитами
                                        организации или внесите реквизиты в текстовое поле для комментариев ниже</label>
                                    <Field name="file" component={FieldFileInput} type="file"
                                           className="form-control text-danger"/>
                                </div>
                            </div>
                        }
                        <div className="col-12 mb-3">
                            <div className="custom-control px-0">
                                <label htmlFor="comment">Дополнительные комментарии к заказу</label>
                                <Field name="comment" component="textarea" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="custom-control px-0">
                                <Field name="confirm" id="confirm"
                                       component={CheckboxCreator('confirm','Согласие на обработку персональных данных**')}
                                       validate={[required]}
                                       type="checkbox"/>
                                {/*<label className="pl-1" htmlFor="confirm">Согласие на обработку персональных данных**</label>*/}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="custom-control px-0">
                                <label className="pl-1">* - обязательные данные</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="custom-control px-0">
                                <label className="pl-1">** В соответствии с законодательством РФ. Отправляя заказ Вы
                                    выражаете согласие на обработку персональных данных и принимаете
                                    условия <Link href={`/law`} className="second-color text-bold">Политики конфиденциальности</Link></label>
                            </div>
                        </div>
                        {/*<div className="cart-btn mt-100">*/}
                        {/*    <button className="btn amado-btn w-100">Оформить</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>


            <CartSummary cartSum={props.cartSum}
                         deliveryPrice={props.deliveryPrice}
                         btnValue={'Отправить'} onBack={props.onBack}/>
        </form>
    )
}

const ContactFormRedux = reduxForm({
    form: 'contact'
})(ContactForm)


const FieldFileInput = (props) => {
    return (
        <input type='file' onChange={(e) => props.input.onChange(e.target.files[0])}/>
    )
}

export default Checkout

