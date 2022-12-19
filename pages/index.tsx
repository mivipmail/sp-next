import {GetServerSideProps} from 'next'
import {StreetsignColorType, StreetsignType} from "../definitions/types";
import * as React from "react";
import ConstructorContainer from "../components/constructor/ConstructorContainer";
import productController from "../controllers/productController";
import constController from "../controllers/constController";
import PageContainer from "../components/common/PageContainer/PageContainer";
import {CommonPropsType, getCommonProps} from "../components/common/PageContainer/getCommonProps";
import {CONSTS} from "../definitions/consts";

type PropsType = {
    streetsigns: StreetsignType[]
    streetsignColors: StreetsignColorType[]
} & CommonPropsType

export default function Index({subdomainCity, categories, cities, company, streetsigns, streetsignColors}: PropsType) {
    return (
        <PageContainer subdomainCity={subdomainCity}
                       title={CONSTS.INDEX_META.TITLE}
                       keywords={CONSTS.INDEX_META.KEYWORDS}
                       description={CONSTS.INDEX_META.DESCRIPTION}
                       categories={categories}
                       cities={cities}
                       company={company}>
            <ConstructorContainer streetsigns={streetsigns} streetsignColors={streetsignColors}/>
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const commonProps = await getCommonProps(context.req)

    // console.log(process.env.NODE_ENV)

    const streetsigns = await productController.getStreetsigns()
    const streetsignColors = constController.getStreetsignColors()

    return {
        props: {
            ...commonProps,
            streetsigns: streetsigns.filter(el => el.is_published),
            streetsignColors: streetsignColors,
        },
    };
}