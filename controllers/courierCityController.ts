import {CdekCity} from "../db/models";
import {CourierCityType} from "../consts/types";
import {Op} from "sequelize";
import cdekIntegrator from "../lib/CdekIntegrator";

const courierCityController = {
    getCourierCities(query: string): Promise<Array<CourierCityType>> {
        return CdekCity.findAll({
            where: {
                city: {
                    [Op.startsWith]: query
                }
            }
        }).then(data => JSON.parse(JSON.stringify(data)))
    },

/*
    async getCourierCityPrice(cityId: number): Promise<number|null> {
        if (await cdekIntegrator.getToken()) {
            return cdekIntegrator.getCourierPrice(cityId)
        }
        return null
    }
*/
}

export default courierCityController