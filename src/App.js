import React from 'react';

import './App.css';
import PortfolioWorth from './Components/PortfolioWorth'
import CoinList from './Components/CoinList'
import AddCoin from './Components/AddCoin'

class App extends React.Component {
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoin />
        <CoinList />
        <PortfolioWorth />
    	</div>
    );
  }	
}

export default App;
