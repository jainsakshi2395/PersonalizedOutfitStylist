import { SET_CARD_DETAILS } from './cardDetailsAction';

const initialState = {
  cardDetails: null,
};

function cardDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARD_DETAILS:
      return {
        ...state,
        cardDetails: action.payload,
      };
    default:
      return state;
  }
}

export default cardDetailsReducer;
