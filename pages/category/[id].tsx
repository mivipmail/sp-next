import React from 'react'
import {GetServerSideProps} from "next";
import productController from "../../controllers/productController";
import CategoryContainer from "../../components/category/CategoryContainer";
import {CategoryType, ProductType} from "../../definitions/types";
import {CommonPropsType, getCommonProps} from "../../components/common/PageContainer/getCommonProps";
import PageContainer from "../../components/common/PageContainer/PageContainer";

type PropsType = {
    products: ProductType[]
    category: CategoryType
} & CommonPropsType

export default function CategoryPage({subdomainCity, categories, cities, company, products, category}: PropsType) {
    const metaKeywords = `${category.title}, ${category.title} ${subdomainCity}`

    return (
        <PageContainer subdomainCity={subdomainCity}
                       title={category.title}
                       keywords={metaKeywords}
                       description={category.description}
                       categories={categories}
                       cities={cities}
                       company={company}>
            <CategoryContainer category={category} products={products}/>
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {categories, ...restCommonProps} = await getCommonProps(context.req)

    const id = Number(context.query.id)

    const products = await productController.getProducts(id)
        .then(data => data.filter(el => el.is_published))
    const category = categories.find(el => el.id === id)

    if (!category) {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        }
    }

    return {
        props: {
            ...restCommonProps,
            categories: categories,

            products: products,
            category: category,
        },
    };
}
