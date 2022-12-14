import * as React from "react";
import Title from "../title/Title";
// @ts-ignore
import HTMLReactParser from "html-react-parser";
import {CONSTS} from "../../../consts/consts";

type PropsType = {
    title?: string
    message?: string
}

const Message: React.FC<PropsType> = ({title = CONSTS.ERROR_404_TITLE, message = CONSTS.ERROR_404_MSG}) => {

    return (
        <div className="col-12 col-md-9 mb-5">
            <Title title={title}/>

            <div className="my-5 py-5 text-center">
                <h5 className="my-5 py-5">{HTMLReactParser(message)}</h5>
            </div>

        </div>
    )
}

export default Message
// withScrollReset