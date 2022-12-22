import * as React from "react";
import Title from "../title/Title";
import HTMLReactParser from "html-react-parser";
import {CONSTS} from "../../../definitions/consts";

type PropsType = {
    title?: string
    message?: string
}

const Message: React.FC<PropsType> = ({title = CONSTS.ERROR_404_TITLE, message = CONSTS.ERROR_404_MSG}) => {

    return (
        <div className="col-12 col-md-9 mb-5">
            <Title title={title}/>

            <div className="my-5 py-0 py-sm-5 text-center">
                <h5 className="my-5 py-5">{HTMLReactParser(message)}</h5>
            </div>

        </div>
    )
}

export default Message
