import { connect } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import {
  createOnDeleteItemAction,
  createOnClearCartAction,
} from '../../action-creators/cart';

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
    onClearCart: () => dispatch(createOnClearCartAction()),
    onDeleteItem: itemId => dispatch(createOnDeleteItemAction(itemId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
