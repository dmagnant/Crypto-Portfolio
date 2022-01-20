import React from 'react';

class UpdateHoldings extends React.Component {
  handleSubmit = (event) => {
    console.log('handled')
  };
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <input 
        type="text" 
        placeholder='enter amount'
        required 
      />
      <button>update {this.props.symbol} holdings</button>
    </form>
    );
  }
}

export default UpdateHoldings
