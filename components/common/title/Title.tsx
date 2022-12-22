import * as React from "react";

const Title: React.FC<{ title: string }> = (props) => {
    return (
            <div className="row">
                <div className="col-12 px-4 pt-4 pt-md-5 pb-3">
                    <h1 className="mb-3 font-light">{props.title}</h1>
                    <div className="line"></div>
                </div>
            </div>
    )
}

export const CartTitle: React.FC<{ step: number }> = (props) => {
    return <Title title={(props.step) ? `Оформление заказа (Шаг ${props.step} из 3)` : `Корзина товаров`} />
}

export default React.memo(Title)

