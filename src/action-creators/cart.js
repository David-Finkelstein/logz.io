import { CartActionTypes } from '../action-types/cart';

export const createOnClearCartAction = () => ({
  type: CartActionTypes.ON_CLEAR_CART,
  payload: { },

});

export const createOnDeleteItemAction = itemId => ({
  type: CartActionTypes.ON_DELETE_ITEM,
  payload: { itemId },
});

export const createOnEditItemAction = (itemId, quantity, price) => ({
  type: CartActionTypes.ON_EDIT_ITEM,
  payload: { itemId, quantity, price },
});
