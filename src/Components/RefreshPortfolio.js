import React from 'react';
import { Button } from 'semantic-ui-react'

import store from '../stores/configureStore'

const RefreshPortfolioButton = () => <Button onClick={updatePortfolio}>Refresh Portfolio</Button>

function updatePortfolio () {
    if (store.getState().profiles) {
        const profiles = store.getState().profiles
        store.dispatch( {type:'CLEAR_COINS', data:{} } );
        let updateProfiles = [...profiles]
        profiles.forEach( async (coin, i) => {
          await fetch(`https://api.coingecko.com/api/v3/coins/${coin.name.toLocaleLowerCase()}`)
            .then((response) => {
              if (response.status === 404) {
                const err = new Error ("please enter a valid coin name (ex. 'bitcoin')");
                throw err;
              }
              else {
                return response.json();
              }
            })
            .catch((error) => {
              alert(error);
            })
            .then((data) => {
              if (data !== undefined) {
                updateProfiles[i].market_data.current_price.usd = data.market_data.current_price.usd;
                store.dispatch( {type:'ADD_COIN', data:{profiles: updateProfiles[i]}} );
            }
          });
        })
      }      
    };

export { RefreshPortfolioButton }
