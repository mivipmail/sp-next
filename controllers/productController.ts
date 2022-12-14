import {ImageType, ProductType, StreetsignColorType, StreetsignType} from "../consts/types";
import {completePath} from "../utils/helpers";
import {Product, ProductImage} from "../db/models";
import {FindOptions} from "sequelize";
import {CLASSES, PRICE_ACP, PRICE_LAM, PRICE_LUM, STREETSIGN_COLORS, STREETSIGNS} from "../consts/consts";

const productController = {
    getProducts(category_id: number|null = null): Promise<ProductType[]> {
        return Product.findAll({
            attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
            where: (category_id !== null) ? {category_id: category_id} : undefined,
            order: [['unit_order', 'ASC']],
            include: [{
                model: ProductImage, as: 'images',
                attributes: {exclude: ['product_id', 'created_at', 'updated_at']}
            }]
        }).then(data => {
            let products = JSON.parse(JSON.stringify(data))
            products = products.map((product: ProductType) => {
                if(product.class_id === CLASSES.STREETSIGN || product.class_id === CLASSES.CLR_STREETSIGN)
                    return this._insertStreetsignImagesAndAttributes(product)
                else
                    return this._completeImagePathsToAbsolute(product)
            })
            return products
        })
    },

    getProduct(id: number) {
        return Product.findOne({
            attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
            where: {id},
            include: [{
                model: ProductImage, as: 'images',
                attributes: {exclude: ['product_id', 'created_at', 'updated_at']}
            }]
        })
            .then(data => {
                let product = JSON.parse(JSON.stringify(data))
                product = this._completeImagePathsToAbsolute(product)
                return product
            })
            .catch(err => null)
    },

    getStreetsigns(): Promise<Array<StreetsignType>> {
        return Product.findAll({
            raw: true,
            attributes: {exclude: ['unit_order', 'created_at', 'updated_at', 'deleted_at']},
            where: {class_id: CLASSES.STREETSIGN},
            order: [['unit_order', 'ASC']],
        }).then(data => {
            let streetsigns = JSON.parse(JSON.stringify(data))
            streetsigns = streetsigns.map((streetsign: ProductType) => this._insertStreetsignImagesAndAttributes(streetsign))
            return streetsigns
        })
    },

    _completeImagePathsToAbsolute (product: ProductType): ProductType {
        product.images?.forEach((img: ImageType) => {
                img.path = completePath(img.path) as string
                img.thumbnail_path = completePath(img.thumbnail_path)
            }
        )
        return product
    },

    _insertStreetsignImagesAndAttributes(streetsign: ProductType): StreetsignType {
        let images: Array<any> = []
        STREETSIGN_COLORS.forEach((color: StreetsignColorType) => {
                images.push([
                    completePath(`images/streetsigns/at_${streetsign.product_code}_c${color.id}_i0.png`),
                    completePath(`images/streetsigns/at_${streetsign.product_code}_c${color.id}_i1.png`)
                ])
            }
        )
        return {
            ...streetsign,
            images: images,
            thumbnail_image: completePath(`images/streetsigns/at_${streetsign.product_code}_c9_i0.png`) as string,
            // @ts-ignore
            price_acp: STREETSIGNS[streetsign.product_code][PRICE_ACP],
            // @ts-ignore
            price_lum: STREETSIGNS[streetsign.product_code][PRICE_LUM],
            // @ts-ignore
            price_lam: STREETSIGNS[streetsign.product_code][PRICE_LAM],        }
    },
}

export default productController