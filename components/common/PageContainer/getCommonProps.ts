import {BaseCityType, CategoryType} from "../../../definitions/types";
import {IncomingMessage} from "http";
import {getCurrentSubdomain} from "../../../utils/helpers";
import {CITIES, MAIN_DOMAIN_CITY} from "../../../definitions/consts";
import categoryController from "../../../controllers/categoryController";
import cityController from "../../../controllers/cityController";
import constController from "../../../controllers/constController";

export type CommonPropsType = {
    subdomainCity: string
    categories: Array<CategoryType>
    cities: BaseCityType[]
    company: any
}

export const getCommonProps = async (req: IncomingMessage): Promise<CommonPropsType> => {
    const subdomain = getCurrentSubdomain(req)
    // @ts-ignore
    const subdomainCity = (subdomain) ? CITIES[subdomain] : MAIN_DOMAIN_CITY

    const categories = await categoryController.getCategories()
    const cities = await cityController.getCities()
    const company = constController.getCompany()

    return {subdomainCity, categories, cities, company}
}