import {Category} from "../db/models";
import {CategoryType} from "../consts/types";

const categoryController = {
    getCategories(): Promise<Array<CategoryType>> {
        return Category.findAll({
            attributes: ['id', 'title', 'description', 'discount'],
            order: [['unit_order', 'ASC']],
        }).then(data => JSON.parse(JSON.stringify(data)))
    }
}

export default categoryController