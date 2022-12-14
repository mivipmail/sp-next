import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {constructorActions} from "../../redux/constructor-reducer";
import {withLocalStorage} from "../../hocs/withLocalStorage";
import {headerActions} from "../../redux/header-reducer";
import {
    getBase,
    getColor,
    getFon,
    getInvert,
    getLam,
    getLum,
    getSign,
    getStreetsignId,
    getStreetsignOldPrice,
    getStreetsignPrice,
    getStreetsignQuantity
} from "../../redux/constructor-selectors";
import Constructor from "./Constructor";
import {useRouter} from "next/router";
import {CONSTS} from "../../consts/consts";
import {showMessage} from "../../redux/cart-reducer";


const ConstructorContainer = (props) => {
    const categoryTitle = CONSTS.STREETSIGN_CATEGORY_TITLE
    //const navigate = useNavigate()
    const router = useRouter()

    useEffect(() => {
        props.setStreetsigns(props.streetsigns)
    }, [])

    const onAddToCart = (data, checkout = false) => {
        const product = props.streetsigns.find(el => el.id === data.id)
        let dataToCart = {
            product_id: data.id,
            price: data.price,
            l: product.l,
            w: product.w,
            h: product.h,
            quantity: data.quantity,
            attributes: {
                sign: (data.sign) ? data.sign : '---',
                color: props.streetsignColors[data.color][data.base === 'эмаль' ? 'RAL' : 'ORACAL'],
                invert: data.invert,
            }
        }
        if(data.base !== 'эмаль') {
            dataToCart.attributes.base = data.base
            dataToCart.attributes.xl = 0
            dataToCart.attributes.lum = (data.color !== 10) ? data.lum : 0
            dataToCart.attributes.lam = data.lam
        }

        props.addToCart(dataToCart)
        props.resetQty()
        props.showMessage(`Товар «${product.title}» добавлен в корзину`)
        if(checkout)
            router.push('/cart')
    }

    return <Constructor {...props} categoryTitle={categoryTitle} onAddToCart={onAddToCart}/>
}


let mapStateToProps = (state) => {
    return {
        data: {
            id: getStreetsignId(state),
            base: getBase(state),
            color: getColor(state),
            invert: getInvert(state),
            lum: getLum(state),
            lam: getLam(state),
            sign: getSign(state),
            price: getStreetsignPrice(state),
            quantity: getStreetsignQuantity(state),
        },
        fon: getFon(state),
        oldPrice: getStreetsignOldPrice(state),
    }
}

export default connect(mapStateToProps, {
    setFon: constructorActions.setFon,
    setId: constructorActions.setId,
    setColor: constructorActions.setColor,
    toggleInvert: constructorActions.toggleInvert,
    setBase: constructorActions.setBase,
    toggleLum: constructorActions.toggleLum,
    toggleLam: constructorActions.toggleLam,
    incrementQty: constructorActions.incrementQty,
    decrementQty: constructorActions.decrementQty,
    resetQty: constructorActions.resetQty,
    setSignText: constructorActions.setSignText,
    showMessage,
    setStreetsigns: headerActions.setStreetsigns,
})(withLocalStorage(ConstructorContainer));
