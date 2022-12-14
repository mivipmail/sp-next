import Title from "../common/title/Title";
import {useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import {getCity} from "../../redux/header-selectors";
import {AddressType} from "../../consts/types";
import useMap from "../../hooks/useMap";

type PropsType = {
    addresses: AddressType[]
}

let Addresses: React.FC<PropsType> = ({addresses}) => {
    const city = useSelector(getCity)
    const map = useMap()

    useEffect(() => {
        if (city) {
            map.init(addresses, city, false)
        }
    }, [city])

    return (
        <div className="col-12 col-md-9 mb-5">
            <Title title={`Адреса пунктов выдачи заказов (${city})`}/>

            <div className="row">

                <div className="col-12">
                    {map.jsxElement}
                </div>

            </div>
        </div>
    )
}

export default Addresses

