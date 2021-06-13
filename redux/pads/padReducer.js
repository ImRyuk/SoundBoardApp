import {CHANGE_SOURCE} from "./actions"
import {PURGE} from "../library/recorded/actions";

const initPad = (n_pad) => {
    let pad = [];
    for (let i = 0; i < n_pad; i++) {
        let number = i+1;
        pad[i] = {
            id: i,
            sampleId: Math.floor(Math.random() * 5) + 1,
            name: "Pad " + number,
        };
    }
    return pad;
};

const padReducer = (state = initPad(9), action) => {
    switch (action.type) {
        case CHANGE_SOURCE:
            return state.map((item) =>
                item.id === action.pad.id
                    ? { ...item, sampleId: action.sampleId }
                    : item
            );
        case PURGE:
            console.log("Clearing pad store...");
            return initPad(9);
        default:
            return state;
    }
}

export default padReducer;
