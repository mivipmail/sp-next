import {useDispatch, useSelector} from "react-redux";
import {loadCity,} from "../../redux/header-reducer";
import {LocalStorageType, withLocalStorage} from "../../hocs/withLocalStorage";
import * as React from "react";
import {useEffect} from "react";
import {StateType} from "../../redux/store";
import {CategoryType} from "../../definitions/types";
import {getCartCount} from "../../redux/header-selectors";
import {useRouter} from "next/router";
import s from "./Header.module.css";
import Link from "next/link";
import cartImage from "../../public/images/cart.png";
import MessageDialog from "../common/MessageDialog/MessageDialog";
import { cartActions } from "../../redux/cart-reducer";
import {getAppMessage} from "../../redux/cart-selector";
import Image from "next/image";


type OwnPropsType = {
    subdomainCity: string
    categories: CategoryType[]
}

const Header: React.FC<OwnPropsType & LocalStorageType> = (props) => {
    const cartCount = useSelector(getCartCount)
    const cartMessage = useSelector(getAppMessage)
    const product = useSelector((state: StateType) => state.product.product)

    const dispatch = useDispatch()
    const resetMessage = () => dispatch(cartActions.resetMessage())

    const router = useRouter()
    let currentRoute = router.asPath
    if (currentRoute.indexOf('product') >= 0 && product)
        currentRoute = `/category/${product.category_id}`

    useEffect(() => {
        // @ts-ignore
        dispatch(loadCity(props.subdomainCity))
        props.updateCartCount()
    }, []);

    return (
        <header className={`col-12 col-md-3 px-5 pt-3 pb-1 pt-sm-5 pb-sm-4 px-md-1 px-lg-5 ${s.header}`}>
            <div className="logo text-center pb-3 pb-lg-5">
                <Link href="/"
                      className={"text-decoration-none text-uppercase font-weight-normal text-dark " + s.logoTitle}>
                    S<span className="second-color"><i className="fa fa-home"></i></span>plates
                </Link>
                <div className={"text-center text-secondary " + s.logoSubtitle}>Адресные таблички <br/>
                    <span>от производителя</span></div>
            </div>
            <nav className={s.amadoNav + " py-0 py-sm-4 px-4 px-md-3 px-lg-4"}>
                <ul>
                    {props.categories.map((category: CategoryType) =>
                        category.id === 1
                            ?
                            <li className={'/' === currentRoute ? s.active : ''}
                                key={category.id}>
                                <Link href="/">
                                    {category.title} {category.discount > 0 && <span className="bg-danger text-white px-1 ml-2">%</span>}
                                </Link>
                            </li>
                            :
                            <li className={`/category/${category.id}` === currentRoute ? s.active : ''}
                                key={category.id}>
                                <Link href={`/category/${category.id}`}>{category.title}</Link>
                            </li>
                    )}
                    <li className={currentRoute.indexOf('cart') >= 0 ? s.active : ''}>
                        <Link href={`/cart`}>
                            <span className={s.cartA}><Image src={cartImage} alt=""/> Корзина <span>({cartCount})</span></span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <MessageDialog message={cartMessage} resetMessage={resetMessage} />

        </header>
    )
}


export default withLocalStorage(Header)


