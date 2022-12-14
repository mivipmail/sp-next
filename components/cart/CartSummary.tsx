import React from 'react';

type PropsType = {
    cartSum: number
    deliveryPrice: number
    btnValue: string | null

    onSubmit?: (e: any) => void | null
    onBack: (e: any) => void | null
}

const CartSummary: React.FC<PropsType> = ({cartSum, deliveryPrice, btnValue = null, onSubmit = null, onBack = null}) => {
    return (
        <div className="col-12 col-lg-4">
            <div className="cart-summary">
                <h5>К оплате</h5>
                <ul className="summary-table mb-100">
                    <li><span>Стоимость:</span> <span>{cartSum} руб.</span></li>
                    <li><span>Доставка:</span> <span>{deliveryPrice ? deliveryPrice : 'Не выбрана'}
                        {deliveryPrice &&
                            <span> руб.</span>
                        }
                        </span>
                    </li>
                    <li><span>ИТОГО:</span> <span>{cartSum + (deliveryPrice ? deliveryPrice : 0)} руб.</span></li>
                </ul>
                {btnValue &&
                    <div className="cart-btn">
                        {onSubmit ?
                            <button type="button"
                                    onClick={(e) => onSubmit(e)}
                                    disabled={cartSum === 0}
                                    className="btn amado-btn w-100">{btnValue}
                            </button>
                            :
                            <button className="btn amado-btn w-100">{btnValue}</button>
                        }
                    </div>
                }
                <div className="cart-btn mt-3">
                    {onBack &&
                        <button type="button"
                                onClick={(e) => onBack(e)}
                                disabled={cartSum === 0}
                                className="btn amado-btn active w-100">Назад
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartSummary

