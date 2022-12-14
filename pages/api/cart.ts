import type {NextApiRequest, NextApiResponse} from 'next'
import nodemailer from 'nodemailer'
import formidable from "formidable";
import Mailer from "../../lib/Mailer";
import SentMail from "../../mails/SentMail";
import omsIntegrator from "../../lib/OmsIntegrator";
import {getHostname} from "next/dist/shared/lib/get-hostname";
import {getCurrentHost} from "../../utils/helpers";
import OrderMail from "../../mails/OrderMail";
import {COMPANY} from "../../consts/consts";
import productController from "../../controllers/productController";
import {ItemCartType} from "../../consts/types";
import {withSessionRoute} from "../../middlewares/withIronSession";

// IMPORTANT
export const config = {
    api: {
        bodyParser: false,
    },
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const form = new formidable.IncomingForm({
        keepExtensions: true
    });

    let body: any = await new Promise(function (resolve, reject) {
        form.parse(req, async function (err, fields, files) {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                fields,
                files,
            });
        });
    });

    let data = {
        ...JSON.parse(body.fields.data),
        site: 'splates.ru' //getCurrentHost(req)
    }

    data.orderItems.forEach((item: any) => {
        if(item.attributes && !item.attributes.base)
            item.product_id += 1
    })

    // @ts-ignore
    if(typeof req.session.orderSent === 'undefined') {
        // @ts-ignore
        req.session.orderSent = true
        await req.session.save()
    }

    // data.id = await omsIntegrator.storeOrder(data)
    //
    // const mailer = new Mailer()
    //
    // const sentMail = new SentMail(data)
    // await mailer.sendMail(data.email, sentMail)
    //
    // const products = await productController.getProducts()
    // const orderMail = new OrderMail(data, body.files.file, products)
    // await mailer.sendMail(COMPANY.email, orderMail)

    return res.status(200).json(true)
}

export default withSessionRoute(handler)