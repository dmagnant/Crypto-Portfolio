import React from 'react';
import { connect } from 'react-redux';
import store from '../stores/configureStore'

function AddCoinFunc(props) {
	handleSubmit = async (event) => {
  	event.preventDefault();
    const coinName = store.getState().enteredCoin;
    const profiles = store.getState().profiles
    let found = undefined;
    if (profiles) {
      found = profiles.find( 
          (coin) => coin.name.toLocaleLowerCase() === coinName.toLocaleLowerCase()
      );
    }
    if (found !== undefined) {
      alert(`${coinName} is already listed`);
      store.dispatch( {type:'CLEAR_ENTERED_COIN', data:{}} );
    }
    else {
      await fetch(`https://api.coingecko.com/api/v3/coins/${coinName.toLocaleLowerCase()}`)
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
          store.dispatch( {type:'CLEAR_ENTERED_COIN', data:{}} );
        })
        .then((data) => {
          if (data !== undefined) {
            store.dispatch( {type:'ADD_COIN', data:{profiles: data}} );
            store.dispatch( {type:'CLEAR_ENTERED_COIN', data:{}} );
        }
      });
    };
  }
  return (
    <form onSubmit={this.handleSubmit}>
      <input 
        type="text" 
        value={store.getState().enteredCoin}
        onChange={event => store.dispatch( {type:'UPDATE_ENTERED_COIN', data:{enteredCoin: event.target.value}} )}
        placeholder="coin name" 
        required 
      />
      <button>Add coin</button>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    enteredCoin: state.enteredCoin,
  }
}

export default connect(mapStateToProps) (AddCoinFunc);
