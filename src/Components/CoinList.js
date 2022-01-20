import Coin from './Coin'

import React from 'react';

class CoinList extends React.Component {
    render() {
      return (
        <div>
        {this.props.profiles.map(profile => <Coin key={profile.symbol} {...profile}/>)}
      </div>
      );
    }
  }

export default CoinList
