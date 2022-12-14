import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {productActions} from "../../redux/product-reducer";
import Product from "./Product";
import {withLocalStorage} from "../../hocs/withLocalStorage";
import HTMLReactParser from "html-react-parser";
import {useRouter} from "next/router";
import {showMessage} from "../../redux/cart-reducer";

const ProductContainer = (props) => {
    const router = useRouter()

    useEffect(() => {
        props.setProduct(props.dbProduct)
    }, [props.dbProduct])

    const onSubmit = (data, checkout = false) => {
        props.addToCart(data)
        props.resetQty()
        props.showMessage(`Товар «${HTMLReactParser(props.product.product.title)}» добавлен в корзину`)
        if(checkout)
            router.push('/cart')
    }

    if(props.product.product)
        return <Product product={props.product.product}
                        data={props.product.data}
                        onSubmit={onSubmit}
                        incrementQty={props.incrementQty}
                        decrementQty={props.decrementQty} />
    else
        return <></>
}

let mapStateToProps = (state) => {
    return {
        product: state.product,
    }
}


export default connect(mapStateToProps, {
        showMessage,
        setProduct: productActions.setProduct,
        incrementQty: productActions.incrementQty,
        decrementQty: productActions.decrementQty,
        resetQty: productActions.resetQty,
})(withLocalStorage(ProductContainer))
// withScrollReset,