import React from 'react';
import { connect } from 'react-redux';

import {numberWithCommas} from '../utils/validation'
import store from '../stores/configureStore'

class PortfolioWorth extends React.Component {
  handleClick = () => {
    if (store.getState().profiles) {
      const profiles = store.getState().profiles
      store.dispatch( {type:'CLEAR_COINS', data:{} } );
      let updateProfiles = [...profiles]
      profiles.forEach( async (coin, i) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coin.name.toLocaleLowerCase()}`)
          .then((response) => {
            if (response.status === 404) {
              const err = new Error ("please enter a valid coin name (ex. 'bitcoin')");
              throw err;
            }
            else {
              return response.json();
            }
          })
          .catch((error) => {
            alert(error);
          })
          .then((data) => {
            if (data !== undefined) {
              updateProfiles[i].market_data.current_price.usd = data.market_data.current_price.usd;
              store.dispatch( {type:'ADD_COIN', data:{profiles: updateProfiles[i]}} );
          }
        });
      })
    }      
  };
  render() {
  function totalPortfolio(profile) {
    const holdingsData = store.getState().holdingsData;
    const haveCoins = holdingsData.find( (coin) => {
    const {name} = coin;
    return name.toLowerCase() === profile.name.toLowerCase()
    }, profile.name);
    if (haveCoins !== undefined) {
      const coinHoldings = haveCoins.holdings;
      const coinWorth = Number(profile.market_data.current_price.usd * Number(coinHoldings));
      worth += Number(coinWorth);
    }
  }
  const profiles = store.getState().profiles;
  let worth = 0.00;
  if (profiles) {
    profiles.forEach(totalPortfolio, worth);
    store.dispatch( {type:'UPDATE_PORTFOLIO_WORTH', data:{portfolioWorth: worth}} );
  }
  return (
    <div>
      <div> portfolio worth: ${numberWithCommas(store.getState().portfolioWorth.toFixed(2))} </div>
      <button onClick={this.handleClick}> Refresh Portfolio </button>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  }
}

export default connect(mapStateToProps) (PortfolioWorth);
