export type BaseCityType = {
    id: number
    city: string
    city_id: number
    courier_price: number
}

export type CategoryType = {
    id: number
    title: string
    description: string
    discount: number
}

export type ImageType = {
    id: number
    path: string
    thumbnail_path: string|null
    is_main: boolean
}

export type ProductType = {
    id: number
    product_code: string
    class_id: number
    category_id: number
    title: string
    description: string
    l: number
    w: number
    h: number
    price: number
    old_price: number
    is_published: boolean

    images?: Array<ImageType>
}

export type StreetsignType = {
    id: number
    product_code: string
    class_id: number
    category_id: number
    title: string
    description: string
    l: number
    w: number
    h: number
    price: number
    old_price: number
    is_published: boolean

    images?: Array<string[2]>
    thumbnail_image?: string
    price_acp?: number
    price_lum?: number
    price_lam?: number
}

export type StreetsignColorType = {
    id: number
    title: string
    rgb: string
    bg_rgb: string | null
    ORACAL: string | null
    RAL: string | null
}

export type AddressType = {
    id: number
    city: string
    address: string
    address_comment: string
    parcel_shop_name: string
    parcel_shop_code: string
    work_time: string
    card: boolean
    coord_x: number
    coord_y: number
}

export type CourierCityType = {
    id: number|null
    name: string
    courierPrice: number|null
}

export type CompanyType = {
    name: string
    email: string
    phone: string
    phone_href: string
    details: string
    domain: string
}


export type ProductDataType = {
    product_id: number | null
    price: number
    l: number | null
    w: number | null
    h: number | null
    quantity: number
}

export type StreetsignDataType = {
    product_id: number | null
    price: number
    l: number | null
    w: number | null
    h: number | null
    quantity: number
    attributes: {
        sign: string
        color: string
        invert: boolean
        base?: 'ПВХ' | 'АКП'
        xl?: boolean
        lum?: boolean
        lam?: boolean
    }
}

export type ItemType = ProductType | StreetsignType
export type ItemCartType = ProductDataType | StreetsignDataType


export type OrderType = {
    surname: string
    name: string
    phone: string
    email: string
    comment: string
    city: string
    payment: number
    delivery: number
    delivery_price: number
    address: string
    orderItems: Array<ItemCartType>
}

export type OrderDataType = {
    data: string
    file?: typeof File
}
