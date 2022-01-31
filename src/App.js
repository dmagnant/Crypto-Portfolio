import React from 'react';

import './App.css';
import PortfolioWorth from './components/PortfolioWorth'
import CoinList from './components/CoinList'
import AddCoin from './components/AddCoin'
import AddCoinFunc from './components/AddCoinFunc'


class App extends React.Component {
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoinFunc />
        <CoinList />
        <PortfolioWorth />
    	</div>
    );
  }	
}

export default App;
