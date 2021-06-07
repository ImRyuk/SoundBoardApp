import React from 'react';

export const SampleRequire = (item) => {
    switch (item.id) {
        case 1:
            return require("./../../assets/default/samples/cymbal.wav");
        case 2:
            return require('./../../assets/default/samples/daibyoshi.wav');
        case 3:
            return require('./../../assets/default/samples/med_taiko.wav');
        case 4:
            return require('./../../assets/default/samples/taiko.wav');
        case 5:
            return require('./../../assets/default/samples/tsuzumi.wav');
        default:
            return require('./../../assets/default/samples/cymbal.wav');
    }
}
