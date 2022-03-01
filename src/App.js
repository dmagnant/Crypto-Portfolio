import React from 'react';

import './App.css';
import PortfolioWorth from './components/PortfolioWorth'
import CoinList from './components/CoinList'
import AddCoin from './components/AddCoin'
import { RefreshPortfolioButton } from './components/RefreshPortfolio';
import Test from './components/Test'

class App extends React.Component {
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <AddCoin />
        <CoinList />
        <PortfolioWorth />
        <RefreshPortfolioButton />
        {/* <Test /> */}
    	</div>
    );
  }	
}

export default App;
