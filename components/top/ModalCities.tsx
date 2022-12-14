import s from "./Top.module.css";
import React, {useEffect, useState} from "react";
import {BaseCityType} from "../../consts/types";

type PropsType = {
    cities: BaseCityType[]
    saveCity: (city: string) => void
    active: boolean
    setActive: (value: boolean) => void
}

function ModalCities(props: PropsType) {
    let [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => setShow(true), 750)
    }, [])

    return (show ?
        <div className={props.active ? `${s.modalCities} + ${s.active}` : s.modalCities}>
            <div className={" mfp-bg mfp-ready"}>
            </div>
            <div className={" mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"}
                 // tabIndex="-1"
                 style={{overflow: 'hidden auto'}}
                 onClick={() => props.setActive(false)}>
                <div className="mfp-container mfp-image-holder mfp-s-ready">
                    <div className="mfp-content" onClick={e => e.stopPropagation()}>
                        <div className="mfp-figure">
                            <button title="Close (Esc)" type="button" className="mfp-close"
                                    style={{top: 0}}
                                    onClick={() => props.setActive(false)}>×
                            </button>
                            <div className="px-5 py-4"
                                 id="modalCities"
                                 style={{backgroundColor: 'whitesmoke', height: '90vh', overflowY: 'scroll'}}>
                                {props.cities.map(el =>
                                    <p id={el.city_id.toString()} key={el.id}
                                       onClick={() => {
                                           props.saveCity(el.city)
                                           props.setActive(false)
                                       }}>{el.city}</p>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            : <></>
    )
}

export default ModalCities