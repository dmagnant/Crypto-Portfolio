import React from 'react';

import './App.css';
import PortfolioWorth from './Components/PortfolioWorth'
import CoinList from './Components/CoinList'
import AddCoin from './Components/AddCoin'
import AddCoinFunc from './Components/AddCoinFunc'


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
