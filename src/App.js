import './App.css';
import holdingsData from './mock/holdingsData'
import PortfolioWorth from './components/PortfolioWorth'
import CoinList from './components/CoinList'
import AddCoin from './components/AddCoin'
// import store from './stores/configureStore'

import React from 'react';

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