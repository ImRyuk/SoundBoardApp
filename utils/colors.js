export function getRandomColor() {
    let number = Math.floor(Math.random() * 4);
    switch (number) {
        case 0:
            return {backgroundColor: '#FDFCDC'}
        case 1:
            return {backgroundColor: '#F07167'}
        case 2:
            return {backgroundColor: '#0081A7'}
        case 3:
            return {backgroundColor: '#FED9B7'}
        default:
            return '#FED9B7'
    }
}

export const getColor = (item) => {
    switch (item.type) {
        case 'default':
            return {backgroundColor: '#00AFB9'};
        case 'freesound':
            return {backgroundColor: '#F07167'};
        case 'recorded':
            return {backgroundColor: '#FED9B7'};
        default:
            return {backgroundColor: '#0081A7'};
    }

}
