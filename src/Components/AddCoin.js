import React from 'react';

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

export default AddCoin;
