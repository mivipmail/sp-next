import type {NextApiRequest, NextApiResponse} from 'next'
import cdekIntegrator from "../../../../lib/CdekIntegrator";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<number|null>,
) {
    const {cityId} = req.query

    if (await cdekIntegrator.getToken()) {
        const price = await cdekIntegrator.getCourierPrice(Number(cityId))
        return res.status(200).json(price)
    }
    // return next(ApiError.internal('Ошибка доступа к API СДЭК'))
}