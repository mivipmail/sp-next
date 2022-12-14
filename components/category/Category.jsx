import React from 'react';
import Title from "../common/title/Title";
import s from "./Category.module.css";
import HTMLReactParser from "html-react-parser";
import Link from "next/link";

function Category(props) {
    return (
        <div className="col-12 col-md-9 pb-5">
            <Title title={props.categoryTitle}/>

            <div className="d-flex flex-wrap justify-content-around">
                {
                    (props.products) ? props.products.map((product) => (
                        <div className={s.productCard} key={product.id}>
                            <Link href={`/product/${product.id}`}>
                                <img alt={HTMLReactParser(product.title)} className={s.productImg}
                                     src={product.images.find(el => el.is_main).thumbnail_path}/>

                                <h3 className={`p-2`}>{HTMLReactParser(product.title)}</h3>
                                <p>{product.price} руб.</p>
                                <button className={s.cart}
                                        onClick={(e) => props.onAddToCart(e, product)}
                                        title="Добавить в корзину"><i className="fa fa-shopping-cart"></i></button>
                            </Link>
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

export default Category

