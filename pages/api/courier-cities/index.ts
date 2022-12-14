import type {NextApiRequest, NextApiResponse} from 'next'
import courierCityController from "../../../controllers/courierCityController";
import {CourierCityType} from "../../../definitions/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CourierCityType[]>,
) {
    let {query} = req.query
    query = query ?? ''

    try {
        const cities = await courierCityController.getCourierCities(query as string)
        return res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(cities)
    } catch(e) {
        console.log(e)
        // return next(ApiError.internal('Произошла ошибка при обращении к базе данных'))
    }
}
