import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../redux/product-reducer";
import Product from "./Product";
import {LocalStorageType, withLocalStorage} from "../../hocs/withLocalStorage";
import HTMLReactParser from "html-react-parser";
import {useRouter} from "next/router";
import {cartActions, showMessage} from "../../redux/cart-reducer";
import {ProductType} from "../../definitions/types";
import {StateType} from "../../redux/store";

type OwnPropsType = {
    dbProduct: ProductType
}

const ProductContainer: React.FC<OwnPropsType & LocalStorageType> = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const product = useSelector((state: StateType) => state.product)

    const incrementQty = () => dispatch(productActions.incrementQty())
    const decrementQty = () => dispatch(productActions.decrementQty())

    useEffect(() => {
        dispatch(productActions.setProduct(props.dbProduct))

        return () => {
            dispatch(cartActions.resetMessage())
            dispatch(productActions.resetQty())
        }
    }, [props.dbProduct])

    const onSubmit = (data: any, checkout = false) => {
        props.addToCart(data)
        // @ts-ignore
        dispatch(showMessage(`Товар «${HTMLReactParser(product.product.title)}» добавлен в корзину`))
        dispatch(productActions.resetQty())
        if(checkout)
            setTimeout(() => router.push('/cart'), 1000)
    }

    if(product.product)
        return <Product product={product.product}
                        data={product.data}
                        onSubmit={onSubmit}
                        incrementQty={incrementQty}
                        decrementQty={decrementQty} />
    else
        return <></>
}

export default withLocalStorage(ProductContainer)
