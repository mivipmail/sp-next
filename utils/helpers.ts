import {IncomingMessage} from "http";

// Complete relative (respect to 'static' folder) image path up to absolute path
export const completePath = (path: string|null): string|null => {
    return path ? '/' + path : null //? `${process.env.APP_URL}/${path}` : null
}

export const capitalizeFirst = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1)
}

export const getCurrentUrl = (req: IncomingMessage) => {
    return req.headers.referer
}

export const getCurrentHost = (req: IncomingMessage) => {
    return req.headers.host
}

export const getCurrentSubdomain = (req: IncomingMessage): string|null => {
    const parts = req.headers.host?.split('.')
    return (parts && parts.length > 2) ? parts[0] : null
}

export const formatPhone = (phone: string, addCountryCode: boolean = true): string => {
    phone = phone.replace(/[^0-9]/g, '')
    return ((addCountryCode) ? '+7 (' : '(') + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 8) + '-' + phone.slice(8)
}
