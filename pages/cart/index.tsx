import CartContainer from "../../components/cart/CartContainer";
import {GetServerSideProps} from "next";
import constController from "../../controllers/constController";
import * as React from "react";
import {ProductType, StreetsignColorType} from "../../definitions/types";
import productController from "../../controllers/productController";
import {CommonPropsType, getCommonProps} from "../../components/common/PageContainer/getCommonProps";
import {CONSTS} from "../../definitions/consts";
import PageContainer from "../../components/common/PageContainer/PageContainer";

type PropsType = {
    products: ProductType[]
    streetsignColors: StreetsignColorType[]
} & CommonPropsType

export default function CartPage({subdomainCity, categories, cities, company, products, streetsignColors}: PropsType) {
    return (
        <PageContainer subdomainCity={subdomainCity}
                       title={CONSTS.INDEX_META.TITLE}
                       keywords={CONSTS.INDEX_META.KEYWORDS}
                       description={CONSTS.INDEX_META.DESCRIPTION}
                       categories={categories}
                       cities={cities}
                       company={company}>
            <CartContainer cities={cities}
                           products={products}
                           streetsignColors={streetsignColors}
                           addresses={[]}
                           step={CONSTS.CHECKOUT_STEPS.CART}/>
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const commonProps = await getCommonProps(context.req)

    const products = await productController.getProducts()
        .then(data => data.filter(el => el.is_published))
    const streetsignColors = constController.getStreetsignColors()

    return {
        props: {
            ...commonProps,
            products,
            streetsignColors,
        },
    };
}