import immutable from 'immutable';

import { ItemActionTypes } from '../../../action-types/item';
import { CartActionTypes } from '../../../action-types/cart';

const defaultState = immutable.Map({});

export default (state = defaultState, action) => {
  const { payload } = action;
  let newState = state;

  switch (action.type) {
    case ItemActionTypes.ON_ADD_ITEM:
      newState = newState.set(payload.itemId, immutable.Map(payload));
      break;
    case CartActionTypes.ON_DELETE_ITEM:
      newState = newState.delete(payload.itemId);
      break;
    case CartActionTypes.ON_CLEAR_CART:
      newState = defaultState;
      break;
    default:
      return newState;
  }
  return newState;
};
