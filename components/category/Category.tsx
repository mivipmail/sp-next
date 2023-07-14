import React from 'react';
import {useDispatch} from "react-redux";
import {LocalStorageType, withLocalStorage} from "../../hocs/withLocalStorage";
import HTMLReactParser from "html-react-parser";
import {showMessage} from "../../redux/cart-reducer";
import Title from "../common/title/Title";
import s from "./Category.module.css";
import Link from "next/link";
import Image from "next/image";
import {CONSTS} from "../../definitions/consts";
import {CategoryType, ProductType} from "../../definitions/types";


type OwnPropsType = {
    category: CategoryType
    products: ProductType[]
}

const Category: React.FC<OwnPropsType & LocalStorageType> = (props) => {
    const dispatch = useDispatch()

    const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: ProductType) => {
        e.preventDefault()
        props.addToCart({
            product_id: product.id,
            price: product.price,
            l: product.l,
            w: product.w,
            h: product.h,
            quantity: 1,
        })
        // @ts-ignore
        dispatch(showMessage(`Товар «${HTMLReactParser(product.title)}» добавлен в корзину`))
    }

    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={props.category.title}/>

            <div className="d-flex flex-wrap justify-content-around">
                {
                    (props.products) ? props.products.map((product) => (
                        <div className={s.productCard} key={product.id}>
                            <Link href={`/product/${product.id}`}>
                                <Image src={product.images?.find(el => el.is_main)?.thumbnail_path as string}
                                       width={CONSTS.PRODUCT_IMAGE.THUMBNAIL_SIZE.W}
                                       height={CONSTS.PRODUCT_IMAGE.THUMBNAIL_SIZE.H}
                                       alt={HTMLReactParser(product.title).toString()}
                                       className={s.productImg} />

                                <h3 className={`p-2`}>{HTMLReactParser(product.title)}</h3>
                                <p className="d-flex flex-column">
                                    {product.old_price > product.price &&
                                        <del className="text-danger pr-2"><small className={s.priceOld}>{product.old_price} руб.</small>
                                        </del>
                                    }
                                    {product.price} руб.
                                </p>
                                <button className={s.cart}
                                        onClick={(e) => onAddToCart(e, product)}
                                        title="Добавить в корзину"><i className="fa fa-shopping-cart"/></button>
                            </Link>
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

export default withLocalStorage(Category)
