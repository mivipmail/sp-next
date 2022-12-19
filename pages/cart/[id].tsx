import CartContainer from "../../components/cart/CartContainer";
import {GetServerSideProps} from "next";
import constController from "../../controllers/constController";
import productController from "../../controllers/productController";
import * as React from "react";
import {AddressType, ProductType, StreetsignColorType} from "../../definitions/types";
import addressController from "../../controllers/addressController";
import {CommonPropsType, getCommonProps} from "../../components/common/PageContainer/getCommonProps";
import {CONSTS} from "../../definitions/consts";
import PageContainer from "../../components/common/PageContainer/PageContainer";

type PropsType = {
    products: ProductType[]
    streetsignColors: StreetsignColorType[]
    addresses: AddressType[]
    step: number
} & CommonPropsType

export default function CartPage({subdomainCity, categories, cities, company,
                                     products,
                                     streetsignColors,
                                     addresses,
                                     step
                                 }: PropsType) {
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
                           addresses={addresses}
                           step={step}/>
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const commonProps = await getCommonProps(context.req)

    const step = Number(context.query.id)

    if (step > 3) {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        }
    }

    const products = await productController.getProducts()
        .then(data => data.filter(el => el.is_published))
    const streetsignColors = constController.getStreetsignColors()
    let addresses: AddressType[] = []
    if (step === 2)
        addresses = await addressController.getAddresses()

    return {
        props: {
            ...commonProps,
            products,
            streetsignColors,
            addresses,
            step,
        },
    };
}