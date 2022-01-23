export const numberWithCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// export const isCoin = coin => {
//     const {name} = coin;
//     return name.toLowerCase() === this.toLowerCase()
// };
