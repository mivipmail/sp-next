import React from 'react';
import {connect} from "react-redux";
import Category from "./Category";
import {withLocalStorage} from "../../hocs/withLocalStorage";
import HTMLReactParser from "html-react-parser";
import {showMessage} from "../../redux/cart-reducer";

const CategoryContainer = (props) => {
    const onAddToCart = (e, product) => {
        e.preventDefault()
        props.addToCart({
            product_id: product.id,
            price: product.price,
            l: product.l,
            w: product.w,
            h: product.h,
            quantity: 1,
        })
        props.showMessage(`Товар «${HTMLReactParser(product.title)}» добавлен в корзину`)
    }

    return <Category products={props.products}
                     categoryTitle={props.category.title}
                     onAddToCart={onAddToCart}/>
}

let mapStateToProps = (state) => {
    return {
        product: state.product,
    }
}

export default connect(mapStateToProps, {
        showMessage,
})(withLocalStorage(CategoryContainer))
