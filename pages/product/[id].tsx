import React from 'react'
import {GetServerSideProps} from "next";
import categoryController from "../../controllers/categoryController";
import cityController from "../../controllers/cityController";
import constController from "../../controllers/constController";
import productController from "../../controllers/productController";
import Top from "../../components/top/Top";
import Header from "../../components/header/Header";
import ProductContainer from "../../components/product/ProductContainer";
import Footer from "../../components/footer/Footer";
import {BaseCityType, CategoryType, ProductType} from "../../consts/types";

type PropsType = {
    categories: CategoryType[]
    cities: BaseCityType[]
    company: any
    product: ProductType
}

export default function CategoryPage({categories, cities, company, product}: PropsType) {

    return (
        <>
            <Top cities={cities} company={company}/>
            <div className="main-content-wrapper d-flex clearfix">
                <Header categories={categories} />
                {/*// @ts-ignore*/}
                <ProductContainer dbProduct={product} />
                <Footer categories={categories} company={company}/>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.query.id)

    const categories = await categoryController.getCategories()
    const cities = await cityController.getCities()
    const company = constController.getCompany()

    const product = await productController.getProduct(id)

    if(!product) {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
            }
        }
    }

    return {
        props: {
            categories: categories,
            cities: cities,
            company: company,
            product: product,
        },
    };
}
