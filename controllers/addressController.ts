import {CdekAddress} from "../db/models";
import {AddressType} from "../definitions/types";

const addressController = {
    getAddresses(): Promise<Array<AddressType>> {
        return CdekAddress.findAll({
            attributes: {exclude: ['last_update']},
        }).then(data => JSON.parse(JSON.stringify(data)))
    }
}

export default addressController