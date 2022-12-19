import React from 'react'
import {GetServerSideProps} from "next";
import productController from "../../controllers/productController";
import ProductContainer from "../../components/product/ProductContainer";
import {ProductType} from "../../definitions/types";
import {CommonPropsType, getCommonProps} from "../../components/common/PageContainer/getCommonProps";
import PageContainer from "../../components/common/PageContainer/PageContainer";

type PropsType = {
    product: ProductType
} & CommonPropsType

export default function CategoryPage({subdomainCity, categories, cities, company, product}: PropsType) {
    const metaKeywords = `${product.title}, ${product.title} ${subdomainCity}`

    return (
        <PageContainer subdomainCity={subdomainCity}
                       title={product.title}
                       keywords={metaKeywords}
                       description={product.description}
                       categories={categories}
                       cities={cities}
                       company={company}>
            <ProductContainer dbProduct={product}/>
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const commonProps = await getCommonProps(context.req)

    const id = Number(context.query.id)

    const product = await productController.getProduct(id)

    if (!product) {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        }
    }

    return {
        props: {
            ...commonProps,
            product: product,
        },
    };
}
