type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) =>
    value ? undefined : 'Обязательное поле'

export const email: ValidatorType = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Пожалуйста, введите корректный e-mail' : undefined

export const phone: ValidatorType = value =>
    value && !/^\(?([9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/i.test(value.replace(/\s/g, '')) ?
        'Пожалуйста, проверьте корректность номера телефона. Мы просим указывать номер именно МОБИЛЬНОГО телефона получателя, так как транспортная служба может использовать СМС-уведомления для информирования о готовности заказа к выдаче.' : undefined
