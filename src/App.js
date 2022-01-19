import './App.css';
import {numberWithCommas} from './utils/validation'
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

class Coin extends React.Component {
  render() {
    const profile = this.props;
    const price = profile.market_data.current_price.usd.toFixed(2);
    let coinHoldings = 0;
    let worth = 0;
    try {
      coinHoldings = holdingsData.find(isCoin, profile.name).holdings;
      worth = (price * coinHoldings).toFixed(2);
    }
    catch (err) {
      // no coins held
    }
    return (
      <div className="coin-profile">
        <img src={profile.image.small} alt="coin" />
        <div className="info">
          <div className="name"> {profile.name}</div>
          <div className="price"> current price: ${numberWithCommas(price)}</div>
          <div className="holdings"> 
          <UpdateHoldings symbol={profile.symbol}/>
          <div>holdings: {coinHoldings} {profile.symbol}</div>
          </div>
          <div className="worth"> worth: ${numberWithCommas(worth)}</div>
        </div>
      </div>
    );
  }
}

class UpdateHoldings extends React.Component {
  handleSubmit = (event) => {
    console.log('handled')
  };
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <input 
        type="text" 
        placeholder='enter amount'
        required 
      />
      <button>update {this.props.symbol} holdings</button>
    </form>
    );
  }
}

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
        if (data !== undefined) {
          this.props.onSubmit(data);
      }
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
  handleClick = (event) => {
    console.log('handled');
    this.props.onClick();
  };
    render() {
    function totalPortfolio(profile) {
        const haveCoins = holdingsData.find(isCoin, profile.name);
        if (haveCoins !== undefined) {
          const coinHoldings = holdingsData.find(isCoin, profile.name).holdings;
          const coinWorth = Number(profile.market_data.current_price.usd * Number(coinHoldings));
          worth += Number(coinWorth);
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

class App extends React.Component {
  state = {
    profiles: [],
    holdings: holdingsData,
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
  refreshPortfolio = () => {
    if (this.state.profiles) {
      this.state.profiles.forEach((profile) => console.log(profile.name));
      let updateProfile = [...this.state.profiles]
      console.log(updateProfile[0].market_data.current_price.usd)
      updateProfile[0].market_data.current_price.usd = 999;
      console.log(updateProfile[0].market_data.current_price.usd)
      this.setState({
        profiles: [...updateProfile],
      })
      console.log('from state: ', this.state.profiles[0].market_data.current_price.usd)
  }
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoin onSubmit={this.addNewProfile} />
        <CoinList profiles={this.state.profiles}/>
        <PortfolioWorth onClick={this.refreshPortfolio} profiles={this.state.profiles}/>
    	</div>
    );
  }	
}

export default App;