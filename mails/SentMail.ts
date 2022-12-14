import Mail from "./Mail";

class SentMail extends Mail {
    getSubject = () => {
        return `Заказ ${this.data.id} получен в интернет-магазине «${process.env.APP_NAME}»`
    }

    getText = () => {
        return `Ваш заказ получен. Менеджер с Вами свяжется в течение ближайших РАБОЧИХ суток для подтверждения деталей заказа.`
    }

    getHtml = () => {
        return `<p>Ваш заказ ${this.data.id} получен. <br/>Менеджер с Вами свяжется в течение ближайших РАБОЧИХ суток для подтверждения деталей заказа.</p>`
    }
}

export default SentMail