import {BaseCityType} from "../consts/types";
import {BaseCity} from "../db/models";

const cityController = {
    getCities(): Promise<Array<BaseCityType>> {
        return BaseCity.findAll({
            attributes: ['id', 'city', ['cityid', 'city_id'], ['courierprice', 'courier_price']],
        }).then(data => JSON.parse(JSON.stringify(data)))
    },

/*
    show: RequestHandler =
        async (req, res, next) => {
            const city = this._getCityBySubdomain(req)
            return res.status(200).json({data: city})
        }

    _getCityBySubdomain = (req: Request): string => {
        const host = req.headers.host
        const sub = host?.split('.')
        return (sub && sub.length > 2 && typeof CITIES[sub[0]] !== 'undefined')
            ? CITIES[sub[0]]
            : MAIN_DOMAIN_CITY
    }
*/
}

export default cityController