import Mail from "./Mail";
import {CLASSES, COMPANY, CONSTS} from "../definitions/consts";
import productController from "../controllers/productController";
import {ProductType} from "../definitions/types";

class OrderMail extends Mail {
    products: ProductType[]

    constructor(data: any, file: File|null = null, products: ProductType[] = []) {
        super(data, file);
        this.products = products
    }

    _getCartCost = () => {
        return this.data.orderItems.reduce(
            (currentCount: number, item: any) => currentCount + Number(item.price) * Number(item.quantity), 0)
    }

    getSubject = () => {
        return `Заказ АТ ${this.data.id} с сайта ${this.data.site}`
    }

    getText = () => {
        const getItemText = (item: any, key: number) => {
            const product = this.products.find(product => product.id === item.product_id)
            if(product) {
                if(product.class_id === CLASSES.STREETSIGN)
                    return `    ${key + 1}) ${product.title} - ${item.quantity} шт.
    Материал: ${item.attributes.base}
    Тип: ${product.product_code}
    Цвет: ${item.attributes.color}${item.attributes.invert ? 'i' : ''}
    ${item.attributes.lum
        ? (item.attributes.invert ? '    + Фон светоотражающий' : '    + Светоотражающая')
        : ''
    }
    ${item.attributes.lam ? '+ Ламинaция' : ''}
    Надпись: ${item.attributes.sign}
    Цена: ${item.price} шт.
    `
                else if(product.class_id === CLASSES.CLR_STREETSIGN)
                    return `    ${key + 1}) ${product.title} - ${item.quantity} шт.
    Материал: ЭМАЛИРОВАННАЯ
    Тип: ${product.product_code}
    Цвет: ${item.attributes.color}${item.attributes.invert ? 'i' : ''}
    Надпись: ${item.attributes.sign}
    Цена: ${item.price} шт.
    `
                else
                    return `    ${key + 1}) ${product.title} - ${item.quantity} шт.
    Цена: ${item.price} шт.
    `
            }
            return ''
        }

        const getItemsText = () => {
            return this.data.orderItems.reduce(
                (currentHtml: string, item: any, key: number) => currentHtml + getItemText(item, key), '')
        }

        return `    Информация о заказе ${this.data.id}

    КОНТАКТНЫЕ ДАННЫЕ

    Фамилия: ${this.data.surname}
    Имя: ${this.data.name}
    Контактный телефон: ${this.data.phone}
    E-mail: ${this.data.email}

    КОММЕНТАРИИ
    ${this.data.comment}

    ${this.data.payment == CONSTS.CD_AFTERPAY
        ? '    Оплата при получении'
        //this.data.payment == CONSTS.CD_INVOICE
        : '    Оплата по счету'
    }
    ${this.data.delivery == CONSTS.CD_PICKUP_CDEK
        ? `    Доставка в ПВЗ (${this.data.city}): ${this.data.address}`
        //this.data.delivery == CONSTS.CD_COURIER_CDEK
        : '    Оплата по счету'
    }


    ${getItemsText()}
    ${this.data.orderItems.length + 1}) Доставка: ${this.data.delivery_price} руб.

    ИТОГО (включая доставку): ${this._getCartCost() + this.data.delivery_price} руб.


        Согласовано:
        Проверил:


    ТЕКСТ ОТВЕТА
    ------------------------------------------------------------
    --- Внимание! Техническая информация ---
    ------------------------------------------------------------
    ВАШ ЗАКАЗ ПРИНЯТ В РАБОТУ. СПАСИБО!

    Во вложении письма высылаем макет на утверждение. Просим утвердить макет и подтвердить заказ в ответном письме.
    *ВНИМАНИЕ!
    Утвержденный макет является официальным заданием на производство. Просим его внимательно проверить на предмет орфографических ошибок и корректности указания цифр в адресе. Правильность надписей на утвержденном макете - ответственность заказчика.

    К сожалению, не удалось Вам дозвониться. Просим Вас подтвердить заказ в ответном письме.
    ------------------------------------------------------------


    Здравствуйте,

    Вы оформили заказ в интернет-магазине «${process.env.APP_NAME}».
    Стоимость заказа (включая доставку ${this.data.delivery_price} руб.): ${this._getCartCost() + this.data.delivery_price} руб.
    ${this.data.payment == CONSTS.CD_AFTERPAY
        ? '    Оплата при получении заказа.'
        //this.data.payment == CONSTS.CD_INVOICE
        : '    Безналичная предоплата по счету на организацию.'
    }
    ${this.data.delivery == CONSTS.CD_PICKUP_CDEK
    ? `    Доставка в пункт выдачи (${this.data.city}): ${this.data.address}.
    Когда посылка будет доставлена в пункт выдачи, Ваc оповестят посредством SMS и по электронной почте.
    Срок хранения посылки в пункте выдачи 5 дней.`
    //this.data.delivery == CONSTS.CD_COURIER_CDEK
    : `    Доставка курьером по адресу: ${this.data.city}, ${this.data.address}.
    Курьер предварительно с Вами свяжется по телефону.`
}
    Срок изготовления и доставки 2-5 рабочих дней.

    ---
    С уважением,
    Дарья

    Интернет-магазин «${process.env.APP_NAME}»
    ${COMPANY.phone}`
    }

    getHtml = () => {
        const getItemHtml = (item: any, key: number) => {
            const product = this.products.find(product => product.id === item.product_id)

            if(product) {
                if(product.class_id === CLASSES.STREETSIGN)
                    return `${key + 1}) ${product.title} - ${item.quantity} шт.<br/>
                        Материал: ${item.attributes.base}<br/>
                        Тип: ${product.product_code}<br/>
                        Цвет: ${item.attributes.color}${item.attributes.invert ? 'i' : ''}<br/>
                        ${item.attributes.lum 
                            ? (item.attributes.invert ? '+ Фон светоотражающий<br/>' : '+ Светоотражающая<br/>') 
                            : ''
                        }
                        ${item.attributes.lam ? '+ Ламинaция<br/>' : ''}
                        Надпись: ${item.attributes.sign}<br/>
                        Цена: ${item.price} шт.<br/>
                        <br/>`
                else if(product.class_id === CLASSES.CLR_STREETSIGN)
                    return `${key + 1}) ${product.title} - ${item.quantity} шт.<br/>
                        Материал: ЭМАЛИРОВАННАЯ<br/>
                        Тип: ${product.product_code}<br/>
                        Цвет: ${item.attributes.color}${item.attributes.invert ? 'i' : ''}<br/>
                        Надпись: ${item.attributes.sign}<br/>
                        Цена: ${item.price} шт.<br/>
                        <br/>`
                else
                    return `${key + 1}) ${product.title} - ${item.quantity} шт.<br/>
                        Цена: ${item.price} шт.<br/>
                        <br/>`
            }
            return ''
        }

        const getItemsHtml = () => {
            return this.data.orderItems.reduce(
                (currentHtml: string, item: any, key: number) => currentHtml + getItemHtml(item, key), '')
        }

        return `Информация о заказе ${this.data.id}<br/>
            <br/>
            КОНТАКТНЫЕ ДАННЫЕ<br/>
            <br/>
            Фамилия: ${this.data.surname}<br/>
            Имя: ${this.data.name}<br/>
            Контактный телефон: ${this.data.phone}<br/>
            E-mail: ${this.data.email}<br/>
            <br/>
            КОММЕНТАРИИ<br/>
            ${this.data.comment}<br/>
            <br/>
            ${this.data.payment == CONSTS.CD_AFTERPAY 
                    ? 'Оплата при получении<br/>'
                    //this.data.payment == CONSTS.CD_INVOICE
                    : 'Оплата по счету<br/>'
                }
            ${this.data.delivery == CONSTS.CD_PICKUP_CDEK
                    ? `Доставка в ПВЗ (${this.data.city}): ${this.data.address}<br/>`
                    //this.data.delivery == CONSTS.CD_COURIER_CDEK
                    : 'Оплата по счету<br/>'
                }
            <br/>
            <br/>
            ${getItemsHtml()}
            ${this.data.orderItems.length + 1}) Доставка: ${this.data.delivery_price} руб.<br/>
            <br/>
            ИТОГО (включая доставку): ${this._getCartCost() + this.data.delivery_price} руб.<br/>
            <br/>
            <br/>
                Согласовано:<br/>
                Проверил:<br/>
            <br/>
            <br/>
            ТЕКСТ ОТВЕТА<br/>
            ------------------------------------------------------------<br/>
            --- Внимание! Техническая информация ---<br/>
            ------------------------------------------------------------<br/>
            ВАШ ЗАКАЗ ПРИНЯТ В РАБОТУ. СПАСИБО!<br/>
            <br/>
            Во вложении письма высылаем макет на утверждение. Просим утвердить макет и подтвердить заказ в ответном письме.<br/>
            *ВНИМАНИЕ!<br/>
            Утвержденный макет является официальным заданием на производство. Просим его внимательно проверить на предмет орфографических ошибок и корректности указания цифр в адресе. Правильность надписей на утвержденном макете - ответственность заказчика.<br/>
            <br/>
            К сожалению, не удалось Вам дозвониться. Просим Вас подтвердить заказ в ответном письме.<br/>
            ------------------------------------------------------------<br/>
            <br/>
            <br/>
            Здравствуйте,<br/>
            <br/>
            Вы оформили заказ в интернет-магазине «${process.env.APP_NAME}».<br/>
            Стоимость заказа (включая доставку ${this.data.delivery_price} руб.): ${this._getCartCost() + this.data.delivery_price} руб.<br/>
            ${this.data.payment == CONSTS.CD_AFTERPAY
                    ? 'Оплата при получении заказа.<br/>'
                    //this.data.payment == CONSTS.CD_INVOICE
                    : 'Безналичная предоплата по счету на организацию.<br/>'
                }
            ${this.data.delivery == CONSTS.CD_PICKUP_CDEK
                    ? `Доставка в пункт выдачи (${this.data.city}): ${this.data.address}.<br/>
                    Когда посылка будет доставлена в пункт выдачи, Ваc оповестят посредством SMS и по электронной почте.<br/>
                    Срок хранения посылки в пункте выдачи 5 дней.<br/>`
                    //this.data.delivery == CONSTS.CD_COURIER_CDEK
                    : `
                    Доставка курьером по адресу: ${this.data.city}, ${this.data.address}.<br/>
                    Курьер предварительно с Вами свяжется по телефону.<br/>`
                }
            Срок изготовления и доставки 2-5 рабочих дней.<br/>
            <br/>
            ---<br/>
            С уважением,<br/>
            Дарья<br/>
            <br/>
            Интернет-магазин «${process.env.APP_NAME}»<br/>
            ${COMPANY.phone}<br/>`
    }
}

export default OrderMail