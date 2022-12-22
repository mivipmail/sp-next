import type {NextApiRequest, NextApiResponse} from 'next'
import formidable from "formidable";
import Mailer from "../../lib/Mailer";
import SentMail from "../../mails/SentMail";
import omsIntegrator from "../../lib/omsIntegrator";
import OrderMail from "../../mails/OrderMail";
import {COMPANY} from "../../definitions/consts";
import productController from "../../controllers/productController";
import {withSessionRoute} from "../../middlewares/withIronSession";
import orderService from "../../lib/orderService";

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

    // @ts-ignore
    if(typeof req.session.orderSent === 'undefined') {
        // @ts-ignore
        req.session.orderSent = true
        await req.session.save()
    }

    const products = await productController.getProducts()

    let data = orderService.prepareDataToSend(body.fields.data, req, products)

    data.id = await omsIntegrator.storeOrder(data)

    try {
        const mailer = new Mailer()

        const sentMail = new SentMail(data)
        await mailer.sendMail(data.email, sentMail)

        const orderMail = new OrderMail(data, body.files.file, products)
        await mailer.sendMail(COMPANY.email, orderMail)
    }
    catch (e) {
        return res.status(500).setHeader("Access-Control-Allow-Origin", "*").json(e)
    }

    return res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(true)
}

export default withSessionRoute(handler)