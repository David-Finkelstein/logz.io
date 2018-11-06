import { ItemActionTypes } from '../../action-types/item';
import {
  createOnItemAddedAction,
  createOnItemExistsAction,
} from '../../action-creators/notification';

export const validItemIdMiddleware = store => next => action => {

  switch (action.type) {
    case ItemActionTypes.ON_ADD_ITEM:
      const cartItems = store.getState().cart;

      if (action.payload.itemId in cartItems.toJS()) {
        next(createOnItemExistsAction());
      } else {
        next(createOnItemAddedAction());
        next(action);
      }

      break;
    default:
      next(action);
      break;
  }
};
