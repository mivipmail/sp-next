import React, {useEffect, useState} from 'react';
import s from "./MessageDialog.module.css";


const MessageDialog: React.FC<{
    message: string|null,
    resetMessage: () => void
}> = (props) => {
    let [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        setTimeout(() => setShowMessage(true), 750)
    }, [])

    return (showMessage ?
        <div className={props.message ? `${s.modal} + ${s.active}` : s.modal}>
            <div className={" mfp-bg mfp-ready"} style={{opacity: '0'}}>
            </div>
            <div className={" mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"}
                 style={{overflow: 'hidden auto'}}
                 onClick={() => props.resetMessage()}>
                <div className="mfp-container mfp-image-holder mfp-s-ready">
                    <div className="mfp-content p-5 bg-top">
                            <h5 className="m-0 p-3 text-white">{props.message}</h5>
                    </div>
                    <div className="mfp-preloader">Loading...</div>
                </div>
            </div>
        </div>
            : <></>
    )
}

export default MessageDialog
