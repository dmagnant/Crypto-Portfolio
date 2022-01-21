export const numberWithCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// export const isCoin = coin => {
//     const {name} = coin;
//     console.log('this: ', this);
//     return name.toLowerCase() === this.toLowerCase()
// };
