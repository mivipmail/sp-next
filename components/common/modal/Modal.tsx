import * as React from "react";
import {useEffect, useState} from 'react';
import s from './Modal.module.css';
import Image from "next/image";

type PropsType = {
    active: boolean
    image?: any

    setActive: (active: boolean) => void
}

const Modal: React.FC<PropsType> = (props) => {
    let [image, setImage] = useState<any | null>(null)

    useEffect(() => {
        setImage(props.image as string)
    }, [props.image])

    const onClose = () => {
        //setImage(null)
        props.setActive(false)
    }

    return (
        <div className={props.active ? `${s.modal} + ${s.active}` : s.modal}>
            <div className={" mfp-bg mfp-ready"}>
            </div>
            <div className={" mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"}
                 style={{overflow: 'hidden auto'}}
                 onClick={onClose}>
                <div className="mfp-container mfp-image-holder mfp-s-ready">

                    <div className="mfp-content" onClick={e => e.stopPropagation()}>
                        <div className="mfp-figure">
                            <button title="Close (Esc)" type="button" className="mfp-close"
                                    onClick={onClose}>×
                            </button>
                            { image &&
                                <figure>
                                    { image.src
                                        ?
                                        <Image className="mfp-img" alt="Second slide"
                                             src={image}
                                             onClick={onClose}/>
                                        :
                                        <img className="mfp-img" alt="Second slide"
                                             src={image}
                                             onClick={onClose}/>
                                    }

                                    <figcaption>
                                        <div className="mfp-bottom-bar">
                                            <div className="mfp-title"></div>
                                            <div className="mfp-counter"></div>
                                        </div>
                                    </figcaption>
                                </figure>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
