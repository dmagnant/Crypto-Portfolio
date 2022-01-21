import { createStore } from 'redux'

const defaultState = {
    profiles: [],
    portfolioWorth: 0.00,
};

function changeState(state = defaultState, action) {
    if (action.type === 'ADD_COIN') {
        return {
            ...state,
            profiles: [...state.profiles, action.data.profiles]
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
