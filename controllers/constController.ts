import {COMPANY, STREETSIGN_COLORS} from "../consts/consts"
import {StreetsignColorType} from "../consts/types";

const constController = {
    getStreetsignColors(): Array<StreetsignColorType> {
        return STREETSIGN_COLORS
    },

    getCompany() {
        return COMPANY
    }
}

export default constController