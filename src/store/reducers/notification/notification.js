import { Map } from 'immutable';
import { NotificationActionTypes } from '../../../action-types/notification';

const defaultState = Map({});

export default (state = defaultState, action) => {
  let newState = state;
  const { payload } = action;

  switch (action.type) {
    case NotificationActionTypes.ON_ITEM_EXISTS:
    case NotificationActionTypes.ON_ITEM_ADDED:
    case NotificationActionTypes.ON_RESET_NOTIFICATION:
    case NotificationActionTypes.ON_DELETE_SUCCEEDED:
    case NotificationActionTypes.ON_EDIT_ITEM_SUCCEEDED:
      newState = newState.set('messageData', payload);
      break;
    default:
      return newState;
  }
  return newState;
};
