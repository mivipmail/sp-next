import {NextApiRequest} from "next";
import {getCurrentHost} from "../utils/helpers";
import {ProductType} from "../definitions/types";
import {CLASSES, CONSTS} from "../definitions/consts";


class OrderService {
    prepareDataToSend = (fieldsData: any, req: NextApiRequest, products: ProductType[]) => {
        let data = {
            ...JSON.parse(fieldsData),
            site: getCurrentHost(req)
        }

        let orderItems: any[] = []
        data.orderItems.forEach((item: any) => {
            let orderItem = this._convertSizesToPackageSizes(item, products)

            if(orderItem.attributes && !orderItem.attributes.base)
                orderItem.product_id += 1
            orderItems.push(orderItem)
        })

        data = {
            ...data,
            orderItems: orderItems
        }

        return data
    }

    _convertSizesToPackageSizes = (item: any, products: ProductType[]) => {
        const product = products.find(el => el.id === item.product_id)
        switch (product?.class_id) {
            case CLASSES.STREETSIGN:
            case CLASSES.CLR_STREETSIGN:
                return {
                    ...item,
                    l: Math.round(item.l/10) + 8,
                    w: Math.round(item.w/10) + 8,
                    h: 1,
                }
            case CLASSES.FLUGER:
                if(product.product_code === 'Ф004500')
                    return {
                        ...item,
                        l: CONSTS.FLUGER_FIXTURE_PACKAGE.L,
                        w: CONSTS.FLUGER_FIXTURE_PACKAGE.W,
                        h: CONSTS.FLUGER_FIXTURE_PACKAGE.H,
                    }
                else
                    return {
                        ...item,
                        l: CONSTS.FLUGER_PACKAGE.L,
                        w: CONSTS.FLUGER_PACKAGE.W,
                        h: CONSTS.FLUGER_PACKAGE.H,
                    }
            default:
                return {
                    ...item,
                    l: Math.round(item.l/10),
                    w: Math.round(item.w/10),
                    h: Math.round(item.h/10),
                }
        }
    }
}

const orderService = new OrderService()

export default orderService