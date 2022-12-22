import React from 'react';
import {useSelector} from "react-redux";
import {CONSTS} from "../../definitions/consts";
import {getCartCount} from "../../redux/header-selectors";
import Link from "next/link";
import {CategoryType} from "../../definitions/types";

type PropsType = {
    categories: CategoryType[]
    company: any
}

const Footer: React.FC<PropsType> = ({categories, company}) => {
    const cartCount = useSelector(getCartCount)

    return (
        <div className="container-fluid footer">
            <div className="row pt-4 pb-1">
                <div className="offcet-0 col-12 offset-md-1 col-md-4 mb-4">
                    <noindex>
                    <ul className="text-decoration-none">
                        <li className="text-dark">
                            © 2022 {company && company.name}
                        </li>
                        <li className="text-dark">
                            <i className="fa fa-envelope"/> {company && company.email}
                        </li>
                        <li className="text-dark">
                            <i className="fa fa-phone"/> <a href={`callto:${company && company.phone_href}`}
                                                               className="text-sm text-decoration-none">
                                                                {company && company.phone}
                                                            </a>
                        </li>
                    </ul>
                    </noindex>
                </div>
                <div className="col-6 col-md-3 mb-4">
                    <ul className="text-decoration-none">
                        <li className="text-dark">
                            <h5>Интернет-магазин</h5>
                        </li>
                        {categories.map(category => (
                                <li key={category.id}>
                                    <Link href={category.title !== CONSTS.STREETSIGN_CATEGORY_TITLE ? `/category/${category.id}` : ``} className="text-sm text-decoration-none">
                                        {category.title}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div className="col-6 col-md-3 mb-4">
                    <ul className="text-decoration-none">
                        <li className="text-dark">
                            <h5>Информация</h5>
                        </li>
                        <li>
                            <Link href={`/cart`} className="text-sm text-decoration-none">
                                {`Корзина (${cartCount})`}
                            </Link>
                        </li>
                        <li>
                            <Link href={`/terms`} className="text-sm text-decoration-none">
                                Доставка и оплата
                            </Link>
                        </li>
                        <li>
                            <Link href={`/addresses`} className="text-sm text-decoration-none">
                                Пункты самовывоза
                            </Link>
                        </li>
                        <li>
                            <noindex>
                            <Link href={`/offer`} className="text-sm text-decoration-none" rel="nofollow">
                                Публичная оферта
                            </Link>
                            </noindex>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer

