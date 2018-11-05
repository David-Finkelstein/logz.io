import { NotificationActionTypes } from '../action-types/notification';
import { BLACK, BLUE, GREEN, RED } from '../constants/notification';

export const createOnItemExistsAction = () => ({
  type: NotificationActionTypes.ON_ITEM_EXISTS,
  payload: {
    message: 'The item exists in the cart you can edit/delete it',
    color: RED,
  },
});

export const createOnItemAddedAction = () => ({
  type: NotificationActionTypes.ON_ITEM_ADDED,
  payload: {
    message: 'The item has been added!',
    color: GREEN,
  },
});

export const createOnClearCartNotificationAction = () => ({
  type: NotificationActionTypes.ON_RESET_NOTIFICATION,
  payload: {
    message: 'The cart cleared!',
    color: BLACK,
  },
});
export const createOnDeleteSucceededAction = itemId => ({
  type: NotificationActionTypes.ON_DELETE_SUCCEEDED,
  payload: {
    message: `The item id - "${itemId}" removed from the cart`,
    color: BLUE,
  },
});
