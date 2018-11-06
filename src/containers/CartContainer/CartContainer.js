import { connect } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import {
  createOnDeleteItemAction,
  createOnClearCartAction,
  createOnEditItemAction,
} from '../../action-creators/cart';
import {
  createOnClearCartNotificationAction,
  createOnDeleteSucceededAction,
  createOnEditItemSucceededAction,
} from '../../action-creators/notification';

function mapStateToProps(state) {
  const items = Object.values(state.cart.toJS());
  const cartItems = items.map(
      item => ({
        ...item, totalPriceForThisItem: item.price * item.quantity,
      }));

  const totalCartPrice = cartItems.reduce(
      (acc, curr) => acc + curr.totalPriceForThisItem, 0);

  return {
    cartItems: cartItems || [],
    totalCartPrice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClearCart: () => {
      dispatch(createOnClearCartAction());
      dispatch(createOnClearCartNotificationAction());
    },

    onDeleteItem: itemId => {
      dispatch(createOnDeleteItemAction(itemId));
      dispatch(createOnDeleteSucceededAction(itemId));
    },

    onEditItem: (itemId, quantity, price) => {
      dispatch(createOnEditItemAction(itemId, quantity, price));
      dispatch(createOnEditItemSucceededAction(itemId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
