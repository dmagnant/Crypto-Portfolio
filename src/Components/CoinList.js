import React from 'react';
import { connect } from 'react-redux';

import Coin from './Coin'
import store from '../stores/configureStore'


class CoinList extends React.Component {
    render() {
      return (
        <div>
        {store.getState().profiles.map(profile => <Coin key={profile.symbol} {...profile}/>)}
      </div>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  }
}

export default connect(mapStateToProps) (CoinList);
