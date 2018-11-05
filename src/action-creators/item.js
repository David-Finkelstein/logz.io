import { ItemActionTypes } from '../action-types/item';

export const createAddItemAction = (itemId, price, quantity) => ({
  type: ItemActionTypes.ON_ADD_ITEM,
  payload: {
    itemId, price, quantity,
  },
});
