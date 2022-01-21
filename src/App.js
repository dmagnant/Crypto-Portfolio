import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import PortfolioWorth from './components/PortfolioWorth'
import CoinList from './components/CoinList'
import AddCoin from './components/AddCoin'
import store from './stores/configureStore'

class App extends React.Component {
  addNewProfile = (profileData) => {
    console.log(profileData);
    store.dispatch( {type:'ADD_COIN', data:{profiles: profileData}} );
  };
  refreshPortfolio = () => {
    if (store.getState().profiles) {
      let profile = store.getState().profiles
      let updateProfiles = [...profile]
      console.log('update: ', updateProfiles);
      updateProfiles.forEach( (coin) => {
        console.log('foreachname: ', coin.name);
      })
      console.log('from state: ', store.getState().profiles[0].market_data.current_price.usd)
      updateProfiles[0].market_data.current_price.usd = 999;
      console.log(updateProfiles[0].market_data.current_price.usd)
      console.log('from state: ', store.getState().profiles[0].market_data.current_price.usd)
  }
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoin onSubmit={this.addNewProfile} />
        <CoinList />
        <PortfolioWorth onClick={this.refreshPortfolio} />
    	</div>
    );
  }	
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  }
}

export default connect(mapStateToProps) (App);
