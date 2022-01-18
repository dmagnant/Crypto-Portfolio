import './App.css';
import React from 'react';

const holdingsData = [
  {name: "bitcoin", holdings: 0.1},
  {name: "cardano", holdings: 100.00},
  {name: "ethereum", holdings: 1.00},
];

class CoinList extends React.Component {
  render() {
    return (
      <div>
      {this.props.profiles.map(profile => <Coin key={profile.symbol} {...profile}/>)}
    </div>
    );
  }
}

function isCoin(coin) {
  return coin.name.toLowerCase() === this.toLowerCase();
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// let portfolioTotal = 0;

class Coin extends React.Component {
  render() {
    const profile = this.props;
    const price = profile.market_data.current_price.usd.toFixed(2);
    let coin_holdings = 0;
    let worth = 0;
    try {
      coin_holdings = holdingsData.find(isCoin, profile.name).holdings;
      worth = (price * coin_holdings).toFixed(2);
    }
    catch (err) {
      // no coins held
    }
    // portfolioTotal += Number(worth);
    return (
      <div className="coin-profile">
        <img src={profile.image.small} alt="coin" />
        <div className="info">
          <div className="name"> {profile.name}</div>
          <div className="price"> current price: ${numberWithCommas(price)}</div>
          <div className="holdings"> 
          {/* <UpdateHoldings /> */}
          <div>holdings: {coin_holdings} {profile.symbol}</div>
          </div>
          <div className="worth"> worth: ${numberWithCommas(worth)}</div>
        </div>
      </div>
    );
  }
}

// class UpdateHoldings extends React.Component {
//   handleSubmit = (event) => {
//     console.log('handled')
//   };
//   render () {
//     return (
//       <form onSubmit={this.handleSubmit}>
//       <input 
//         type="text" 
//         placeholder="enter amount" 
//         required 
//       />
//       <button>update holdings</button>
//     </form>
//     );
//   }
// }

class AddCoin extends React.Component {
	state = { coin: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    await fetch(`https://api.coingecko.com/api/v3/coins/${this.state.coin.toLocaleLowerCase()}`)
      .then((response) => {
        if (response.status === 404) {
          const err = new Error ("please enter a valid coin name (ex. bitcoin)");
          throw err;
        }
        else {
          return response.json();
        }
      })
      .catch((error) => {
        alert(error);
        this.setState({ coin: '' });
      })
      .then((data) => {
        console.log('data: ', data.error)
        this.props.onSubmit(data);
    });
    this.setState({ coin: '' });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.coin}
          onChange={event => this.setState({ coin: event.target.value})}
          placeholder="coin name" 
          required 
        />
        <button>Add coin</button>
    	</form>
    );
  }
}



class PortfolioWorth extends React.Component {
    render() {
    function totalPortfolio(profile) {
        const haveCoins = holdingsData.find(isCoin, profile.name);
        if (haveCoins !== undefined) {
          const coin_holdings = holdingsData.find(isCoin, profile.name).holdings;
          console.log('coin_holdings: ', coin_holdings);
          worth += Number((profile.market_data.current_price.usd * coin_holdings).toFixed(2));
          console.log('worth: ', worth);
        }
    }
    const profile = this.props.profiles[this.props.profiles.length-1];
    let worth = 0;
    if (profile) {
      this.props.profiles.forEach(totalPortfolio, worth);
    }
    return (
      <div> portfolio worth: ${numberWithCommas(worth)} </div>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
    holdings: holdingsData,
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
    // console.log(this.state.profiles);
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoin onSubmit={this.addNewProfile} />
        <CoinList profiles={this.state.profiles}/>
        <PortfolioWorth profiles={this.state.profiles}/>
    	</div>
    );
  }	
}

export default App;