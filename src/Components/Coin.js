import React from 'react';

import UpdateHoldings from './UpdateHoldings'
import { numberWithCommas } from '../utils/validation'
import store from '../stores/configureStore'

class Coin extends React.Component {
  render() {
    const profile = this.props;
    const {symbol, name} = profile;
    const price = profile.market_data.current_price.usd.toFixed(2);
    let coinHoldings = 0;
    let worth = 0;
    try {
      coinHoldings = store.getState().holdingsData.find((coin) => {
        const {name} = coin;
        return name.toLowerCase() === profile.name.toLowerCase()
      }, name).holdings;
      worth = (price * coinHoldings).toFixed(2);
    }
    catch (err) {
      // no coins held
    }
    return (
      <div className="coin-profile">
        <img src={profile.image.small} alt="coin" />
        <div className="info">
          <div className="name"> {name}</div>
          <div className="price"> current price: ${numberWithCommas(price)}</div>
          <div className="holdings"> 
            <UpdateHoldings symbol={symbol} name={name}/>
            <div>holdings: {coinHoldings} {symbol}</div>
          </div>
          <div className="worth"> worth: ${numberWithCommas(worth)}</div>
        </div>
      </div>
    );
  }
}

export default Coin;
