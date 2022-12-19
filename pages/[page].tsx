import React from 'react';
import {GetServerSideProps} from "next";
import {AddressType} from "../definitions/types";
import Terms from "../components/terms/Terms";
import Addresses from "../components/addresses/Addresses";
import addresses from "../components/addresses/Addresses";
import Offer from "../components/offer/Offer";
import Law from "../components/law/Law";
import addressController from "../controllers/addressController";
import Message from "../components/common/message/Message";
import {withSessionSsr} from "../middlewares/withIronSession";
import {CONSTS} from "../definitions/consts";
import PageContainer from "../components/common/PageContainer/PageContainer";
import {CommonPropsType, getCommonProps} from "../components/common/PageContainer/getCommonProps";

type PropsType = {
    page: string
    addresses: AddressType[] | undefined
} & CommonPropsType

export default function Page({subdomainCity, categories, cities, company, page, addresses}: PropsType) {
    const getPageComponent = (page: string) => {
        switch (page) {
            case 'terms':
                return <Terms/>
            case 'offer':
                return <Offer company={company}/>
            case 'law':
                return <Law/>
            case 'thankyou':
                return <Message title={CONSTS.THANKYOU_TITLE} message={CONSTS.THANKYOU_MSG}/>
            case 'addresses':
                return <Addresses addresses={addresses as AddressType[]}/>
            default:
                return <Message/>
        }
    }

    return (
        <PageContainer subdomainCity={subdomainCity}
                       title={CONSTS.INDEX_META.TITLE}
                       keywords={CONSTS.INDEX_META.KEYWORDS}
                       description={CONSTS.INDEX_META.DESCRIPTION}
                       categories={categories}
                       cities={cities}
                       company={company}>
            {
                getPageComponent(page)
            }
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({query, req}) => {
    const commonProps = await getCommonProps(req)

    const page = query.page

    if (page === 'thankyou') {
        // @ts-ignore
        if (typeof req.session.orderSent === 'undefined') {
            return {
                redirect: {
                    permanent: false,
                    destination: "/cart"
                }
            }
        } else {
            // @ts-ignore
            delete req.session.orderSent
            await req.session.save()
        }
    }

    const addresses = (page === 'addresses') ? await addressController.getAddresses() : []

    return {
        props: {
            ...commonProps,
            page,
            addresses,
        },
    };
})
