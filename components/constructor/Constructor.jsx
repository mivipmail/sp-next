import React, {useState} from 'react';
import s from './Constructor.module.css';
import Title from "../common/title/Title";
import Modal from "../common/modal/Modal";
import pvc_img from "../../public/images/IMG_2568.png"
import acp_img from "../../public/images/IMG_2571.png"
import clr_img_1 from "../../public/images/t2_коричн.png"
import clr_img_2 from "../../public/images/t8_бордо.png"
import clr_img_3 from "../../public/images/20220812_131540.png"
import lam_img from "../../public/images/IMG_2594.png"
import Image from "next/image";

function ModalSignText(props) {
    return (
        <div className={props.active ? `${s.modalSignText} + ${s.active}` : s.modalSignText}>
            <div className={" mfp-bg mfp-ready"}>
            </div>
            <div className={" mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"}
                 tabIndex="-1"
                 style={{overflow: 'hidden auto'}}
                 onClick={() => props.setActive(false)}>
                <div className="mfp-container mfp-image-holder mfp-s-ready">
                    <div className="mfp-content" onClick={e => e.stopPropagation()}>
                        <div className="mfp-figure">
                            <button title="Close (Esc)" type="button" className="mfp-close"
                                    style={{top: 0}}
                                    onClick={() => props.setActive(false)}>×
                            </button>
                            <div className="p-5" style={{backgroundColor: 'whitesmoke'}}>
                                <h6 className="widget-title mb-3">Пожалуйста, заполните адрес на табличке <br/>(макет
                                    Вам будет выслан на согласование <br/>по электронной почте)</h6>
                                {/*<label htmlFor="sign">Пожалуйста, заполните адрес на табличке</label>*/}
                                <input type="text" className="form-control mb-3"
                                       placeholder="Пример: переулок Серебряный, 7"
                                       value={props.data.sign}
                                       onChange={(e) => props.setSignText(e.target.value)}
                                       id="sign"/>
                                <div className="text-center">
                                    <button type="submit" name="addtocart" value="5"
                                            onClick={() => {
                                                props.onAddToCart(props.data, props.checkoutMode)
                                                props.setActive(false)
                                            }}
                                            className="btn amado-btn active">Продолжить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Constructor(props) {
    let [modalActive, setModalActive] = useState(false)
    let [checkoutMode, setCheckoutMode] = useState(false)
    let [modalImageActive, setModalImageActive] = useState(false)
    let [image, setImage] = useState(null)

    const selectedStreetsign = (props.streetsigns.length > 0) ? props.streetsigns.find(el => el.id === props.data.id) : null

    function onShowImage(e, image) {
        e.preventDefault()
        setImage(image)
        setModalImageActive(true)
    }


    let fonList = []
    for (let i = 0; i < 10; i++)
        fonList.push(
            <li className={"fon-pic" + ((i === props.fon) ? " fon-pic-selected" : "")}
                onClick={() => props.setFon(i)}
                data-src={`url(images/fon${i}.jpg)`}
                key={i}>
                <Image src={`/images/fon-pic${i}.jpg`} width={75} height={53} alt={`Фон ${i + 1}`}/>
            </li>)

    return (
        <>
            <div className="col-12 col-md-9 pb-5">

                <Title title={props.categoryTitle}/>

                <div className="row">

                    <div className="col-12 col-md-6 col-lg-4 px-0">
                        <ul className="fon-list my-0 clearfix">
                            {fonList}
                        </ul>
                        <p className={`text-center`}>Примеры фонов (для визуализации)</p>
                        <div className="fon clearfix"
                             style={{backgroundImage: `url(images/fon${props.fon}.jpg)`}}>
                            <Image src={ selectedStreetsign
                                        ?
                                        selectedStreetsign.images[props.data.color][props.data.invert]
                                        :
                                        `/images/streetsigns/at_28_c0_i0.png`}
                                   width={600}
                                   height={600}
                                   alt={`Макет адресной таблички`}
                                className={s.previewImg}/>
                        </div>
                        { selectedStreetsign &&
                            <p className={`text-center mb-0`}>
                                Размер: {selectedStreetsign.l} x {selectedStreetsign.w} см
                            </p>
                        }

                    </div>

                    <div className={`col-12 col-sm-5 col-md-6 col-lg-4 pt-3 pt-md-0 pl-md-0`}>
                        <div className="widget mb-15">
                            <h6 className="widget-title mb-3">Форма таблички</h6>

                            <div className={`${s.shapeList}`}>
                                <ul className="d-flex flex-wrap">
                                    {props.streetsigns.map((el) => (
                                        <li className={(el.id === props.data.id) ? s.selectedType : ''}
                                            onClick={() => props.setId(el.id)}
                                            key={el.id}><Image src={el.thumbnail_image}
                                                               width={120}
                                                               height={120}
                                                               alt={el.title}/></li>)
                                    )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="widget color mb-15">
                            <h6 className="widget-title mb-3">Цвет</h6>

                            {/*<div className={`widget-desc ${s.colorList}`}>*/}
                            <div className={`${s.colorList}`}>
                                <ul className="d-flex">
                                    {props.streetsignColors.map(color =>
                                        <li className={(color.id === props.data.color) ? s.selectedColor : ''}
                                            onClick={() => props.setColor(color.id)}
                                            key={color.id}><span>
                                                <span style={{
                                                    borderColor: color.rgb,
                                                    backgroundColor: (color.bg_rgb) ? color.bg_rgb : 'white'
                                                }}> </span>
                                        </span></li>
                                    )}
                                </ul>
                            </div>

                            <div className="widget brands">
                                <div className="widget-desc">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="invert"
                                               checked={props.data.invert}
                                               onChange={() => props.toggleInvert()}
                                               id="invert"/>
                                        <label className="form-check-label" htmlFor="invert">Инвертировать цвета</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`col-12 col-sm-7 col-md-12 col-lg-4 pt-3 pt-lg-0 pl-lg-0`}>
                        <div className="widget brands mb-15">
                            <h6 className="widget-title mb-3">Материал основания</h6>

                            <div className="widget-desc">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="base"
                                           checked={props.data.base === 'ПВХ'}
                                           onChange={() => props.setBase('ПВХ')}
                                           value="1" id="pvc"/>
                                    <label className="form-check-label" htmlFor="pvc">Пластик ПВХ 4мм
                                        <p className={s.optionTip}>Пластик ПВХ устойчив к воздействию внешней среды, но
                                            имеет
                                            небольшую пластичность, в результате чего поверхность может быть подвержена
                                            незначительным деформациям. Таблички на пластиковой основе имеют белую
                                            торцевую
                                            кромку, что менее эстетично, чем изделия с композитной основой
                                            <span className="font-weight-bold second-color"
                                                  onClick={(e) => onShowImage(e, pvc_img)}> Фото</span>
                                        </p>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="base"
                                           checked={props.data.base === 'АКП'}
                                           onChange={() => props.setBase('АКП')}
                                           value="2" id="acp"/>
                                    <label className="form-check-label" htmlFor="acp">Алюминиевый композит
                                        <p className={s.optionTip}>Алюминиево-композитная плита АКП - практически не
                                            подвержена
                                            воздействию окружающей среды и самопроизвольной деформации (в отличие от
                                            основы
                                            из
                                            ПВХ), имеет отличный внешний вид и характеристики эксплуатации
                                            <span className="font-weight-bold second-color"
                                                  onClick={(e) => onShowImage(e, acp_img)}> Фото</span>
                                        </p>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="base"
                                           checked={props.data.base === 'эмаль'}
                                           onChange={() => props.setBase('эмаль')}
                                           value="3" id="clr"/>
                                    <label className="form-check-label" htmlFor="clr">Эмалированная табличка
                                        <p className={s.optionTip}>Эмалированная табличка с основой из нержавеющего
                                            металлического сплава - идеальный вариант исполнения уличной таблички. Эти
                                            таблички
                                            безупречно красивы и очень долговечны (срок службы - не менее 10 лет) <br/>
                                            <span className="font-weight-bold second-color"
                                                  onClick={(e) => onShowImage(e, clr_img_1)}> Фото (коричневая)</span> /
                                            <span className="font-weight-bold second-color"
                                                  onClick={(e) => onShowImage(e, clr_img_2)}> Фото (бордо)</span> /
                                            <span className="font-weight-bold second-color"
                                                  onClick={(e) => onShowImage(e, clr_img_3)}> Фото (красная)</span>
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`col-12 col-sm-12 col-md-12 col-lg-12 pt-3`}>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                {props.data.base !== 'эмаль' &&
                                    <div className="widget brands mb-30">
                                        <h6 className="widget-title mb-3">Дополнительные опции</h6>
                                        <div className="widget-desc">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="lum"
                                                       checked={(props.data.color !== 10) ? props.data.lum : false}
                                                       onChange={props.toggleLum}
                                                       disabled={props.data.color === 10}
                                                       id="lum"/>
                                                <label className="form-check-label" htmlFor="lum">Световозвратная
                                                    <p className={s.optionTip}>Белые части изображения таблички могут
                                                        быть выполнены с
                                                        использованием световозвратной пленки. Эффект аналогичен
                                                        дорожным знакам - в темное
                                                        время суток при освещении фарами или фонариком, надписи четко
                                                        различимы и читаемы.
                                                        Опция не доступна для табличек, в изображении которых
                                                        отсутствует белый цвет</p>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="lam"
                                                       checked={props.data.lam}
                                                       onChange={props.toggleLam}
                                                       id="lam"/>
                                                <label className="form-check-label" htmlFor="lam">Ламинация
                                                    <p className={s.optionTip}>Срок службы адресной таблички без
                                                        появления
                                                        заметных
                                                        дефектов
                                                        5-10 лет. Тем не менее, для продления срока службы в качестве
                                                        дополнительной
                                                        защиты
                                                        может быть нанесена ламинирующая пленка
                                                        <span className="font-weight-bold second-color"
                                                              onClick={(e) => onShowImage(e, lam_img)}> Фото</span>
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-12 col-lg-6">

                                <div className="cart clearfix p-4 pull-right">
                                    <div>
                                        {/*<input type="text" name={props.sign}/>*/}
                                        <p className="product-price bg-transparent">
                                            {props.oldPrice > props.data.price &&
                                                <del className="text-danger pr-2"><small>{props.oldPrice} руб.</small></del>
                                            }
                                            {props.data.price} руб.
                                        </p>
                                    </div>
                                    <div className="cart-btn d-flex mb-3">
                                        <p>Количество</p>
                                        <div className="quantity">
                                            <span className="qty-minus"
                                                  onClick={props.decrementQty}><i className="fa fa-caret-down"
                                                                                  aria-hidden="true"></i></span>
                                            <input type="number" className="qty-text"
                                                   disabled={true}
                                                   name="quantity" value={props.data.quantity}/>
                                            <span className="qty-plus"
                                                  onClick={props.incrementQty}><i className="fa fa-caret-up"
                                                                                  aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                    <button type="submit" name="addtocart"
                                            className="btn amado-btn mb-15 mr-15 pull-left"
                                            onClick={() => {
                                                setCheckoutMode(false)
                                                setModalActive(true)
                                            }}>Добавить в корзину
                                    </button>
                                    <button type="submit" name="buy"
                                            className="btn amado-btn active"
                                            onClick={() => {
                                                setCheckoutMode(true)
                                                setModalActive(true)
                                            }}>Добавить и оформить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <ModalSignText active={modalActive}
                           setActive={setModalActive}
                           checkoutMode={checkoutMode}
                           {...props} />

            <Modal active={modalImageActive} setActive={setModalImageActive} image={image} setImage={setImage} />
        </>
    )
}

export default Constructor

