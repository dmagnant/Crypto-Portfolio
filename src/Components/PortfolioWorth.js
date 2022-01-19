import React from 'react';
import {numberWithCommas} from '../utils/validation'
import holdingsData from '../mock/holdingsData'

class PortfolioWorth extends React.Component {
    handleClick = (event) => {
      console.log('handled');
      this.props.onClick();
    };
      render() {
      function totalPortfolio(profile) {
          console.log('profile data: ', profile);
          const haveCoins = holdingsData.find( (coin) => {
            const {name} = coin;
            console.log('tfdsfdasfefaw143: ', this);
            return name.toLowerCase() === profile.name.toLowerCase()
        }, profile.name);
          if (haveCoins !== undefined) {
            const coin_holdings = haveCoins.holdings;
            const coin_worth = Number(profile.market_data.current_price.usd * Number(coin_holdings));
            worth += Number(coin_worth);
          }
      }
      const profile = this.props.profiles;
      let worth = 0.00;
      if (profile) {
        this.props.profiles.forEach(totalPortfolio, worth);
        worth = worth.toFixed(2);
      }
      return (
        <div>
        <div> portfolio worth: ${numberWithCommas(worth)} 
        </div>
        <button onClick={this.handleClick}>Refresh Portfolio </button>
        </div>
      );
    }
  }

  export default PortfolioWorth
