import {COMPANY, STREETSIGN_COLORS} from "../definitions/consts"
import {StreetsignColorType} from "../definitions/types";

const constController = {
    getStreetsignColors(): Array<StreetsignColorType> {
        return STREETSIGN_COLORS
    },

    getCompany() {
        return COMPANY
    }
}

export default constController