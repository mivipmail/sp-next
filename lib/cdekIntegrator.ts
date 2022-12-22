import {capitalizeFirst} from "../utils/helpers";
import querystring from "querystring";


class CdekIntegrator {
    authorization: string | null = null

    getToken = async (): Promise<boolean> => {
        try {
            const response = await fetch(process.env.CDEK_AUTH_URL as RequestInfo | URL, {
                method: 'POST',
                body: querystring.stringify({
                    grant_type: 'client_credentials',
                    client_id: process.env.CDEK_ACCOUNT,
                    client_secret: process.env.CDEK_SECURE_PASSWORD
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
            const data: any = await response.json()

            this.authorization = `${capitalizeFirst(data.token_type)} ${data.access_token}`
        } catch (e) {
            this.authorization = null
        }

        return !!this.authorization
    }

    getAddresses = async () => {
        try {
            const queryString = querystring.stringify({
                type: 'PVZ',
                have_cash: 'true',
                allowed_cod: 'true',
                is_handout: 'true',
            })
            const response = await fetch(`${process.env.CDEK_URL}/v2/deliverypoints?${queryString}`, {
                method: 'GET',
                headers: {
                    'authorization': this.authorization as string,
                },
            })
            const data: any = await response.json()

            if (!!data.length)
                return data
        } catch (e) {
            console.log(e)
        }

        return null
    }

    getCourierPrice = async (cityId: number): Promise<number | null> => {
        try {
            const response = await fetch(`${process.env.CDEK_URL}/v2/calculator/tariff`, {
                method: 'POST',
                headers: {
                    'authorization': this.authorization as string,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'tariff_code': 137,
                    'from_location': {
                        'code': 431,
                    },
                    'to_location': {
                        'code': cityId,
                    },
                    'packages': [
                        {
                            'weight': 600,
                            'length': 78,
                            'width': 38,
                            'height': 1,
                        }
                    ],
                }),
            })
            const data: any = await response.json()

            return data.delivery_sum ?? null
        } catch (e) {
            console.log(e)
        }

        return null
    }
}

const cdekIntegrator = new CdekIntegrator()

export default cdekIntegrator
