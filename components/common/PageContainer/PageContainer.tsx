import Top from "../../top/Top";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Head from "next/head";
import faviconImg from "../../../public/favicon.ico";
import * as React from "react";
import {BaseCityType, CategoryType} from "../../../definitions/types";
import {getCurrentSubdomain} from "../../../utils/helpers";
import {CITIES, MAIN_DOMAIN_CITY} from "../../../definitions/consts";
import categoryController from "../../../controllers/categoryController";
import cityController from "../../../controllers/cityController";
import constController from "../../../controllers/constController";
import {IncomingMessage} from "http";
import Script from "next/script";
import {useEffect} from "react";
import {useRouter} from "next/router";


type PropsType = {
    subdomainCity: string
    title: string
    keywords: string
    description: string

    categories: Array<CategoryType>
    cities: BaseCityType[]
    company: any

    children: React.ReactNode
}

export default function PageContainer({
                                          subdomainCity,
                                          title,
                                          keywords,
                                          description,
                                          categories, cities, company, children
                                      }: PropsType) {
    const router = useRouter()
    const currentRoute = router.asPath

    const metaTitle = `${title} - ${subdomainCity}`

    useEffect(() => {
        // @ts-ignore
        if(typeof ym !== undefined && typeof ym === 'function')
            // @ts-ignore
            ym(50981876, 'hit', currentRoute)

        // @ts-ignore
        if(typeof gtag !== undefined && typeof gtag === 'function') {
            // @ts-ignore
            gtag('set', 'page_path', currentRoute);
            // @ts-ignore
            gtag('event', 'page_view');
        }
    }, [currentRoute])

    return (
        <>
            <Top cities={cities} company={company}/>
            <div className="main-content-wrapper d-flex clearfix">
                <Header subdomainCity={subdomainCity} categories={categories}/>
                {children}
                <Footer categories={categories} company={company}/>
            </div>

            <Head>
                <title>{metaTitle}</title>
                <meta name="keywords" content={keywords}/>
                <meta name="description" content={description}/>
                <meta name="charset" content="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href={faviconImg.src}/>

                {
                    process.env.NODE_ENV === 'production' &&
                    <>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                               (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                               m[i].l=1*new Date();
                               for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                               k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                               (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                            
                               ym(50981876, "init", {
                                    clickmap:true,
                                    trackLinks:true,
                                    accurateTrackBounce:true
                               });
                                `,
                            }}
                        />
                        <noscript><div><img src="https://mc.yandex.ru/watch/50981876" style={{position: 'absolute', left: '-9999px'}} alt="" /></div></noscript>

                        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-7SEM0X1L4G"/>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                
                                    gtag('config', 'G-7SEM0X1L4G');
                                `,
                            }}
                        />
                    </>
                }
            </Head>

        </>
    )
}

