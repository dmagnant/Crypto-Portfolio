import React from 'react';
import { connect } from 'react-redux'
import {numberWithCommas} from '../utils/validation'
import holdingsData from '../mock/holdingsData'
import store from '../stores/configureStore'

class PortfolioWorth extends React.Component {
    handleClick = (event) => {
      console.log('handled');
      this.props.onClick();
    };
      render() {
      function totalPortfolio(profile) {
          const haveCoins = holdingsData.find( (coin) => {
            const {name} = coin;
            return name.toLowerCase() === profile.name.toLowerCase()
        }, profile.name);
          if (haveCoins !== undefined) {
            const coin_holdings = haveCoins.holdings;
            const coin_worth = Number(profile.market_data.current_price.usd * Number(coin_holdings));
            worth += Number(coin_worth);
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
        <div> portfolio worth: ${numberWithCommas(store.getState().portfolioWorth.toFixed(2))} 
        </div>
        <button onClick={this.handleClick}>Refresh Portfolio </button>
        </div>
      );
    }
  }

export default PortfolioWorth;
