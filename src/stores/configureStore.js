import { createStore } from 'redux'

import holdingsData from '../mock/holdingsData'

const defaultState = {
    enteredCoin: '',
    profiles: [],
    portfolioWorth: 0.00,
    holdingsData: holdingsData
};

function changeState(state = defaultState, action) {
    if (action.type === 'ADD_COIN') {
        return {
            ...state,
            profiles: [...state.profiles, action.data.profiles]
        }
    }
    else if (action.type === 'CLEAR_COINS') {
        return {
            ...state,
            profiles: []
        }
    }
    else if (action.type === 'UPDATE_ENTERED_COIN') {
        return {
            ...state,
            enteredCoin: action.data.enteredCoin
        }
    }
    else if (action.type === 'CLEAR_ENTERED_COIN') {
        return {
            ...state,
            enteredCoin: ''
        }
    }
    else if (action.type === 'UPDATE_PRICE') {
        return {
            ...state,
            profiles: [action.data.profiles]
        }
    }
    else if (action.type === 'UPDATE_PORTFOLIO_WORTH') {
        return {
            ...state,
            portfolioWorth: action.data.portfolioWorth
        }
    }
    return state;
}
let store = createStore(changeState);

export default store;
