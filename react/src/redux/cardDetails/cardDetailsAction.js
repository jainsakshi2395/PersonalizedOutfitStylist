export const SET_CARD_DETAILS = 'SET_CARD_DETAILS';

export function setCardDetails(cardDetails) {
  return {
    type: SET_CARD_DETAILS,
    payload: cardDetails,
  };
}
