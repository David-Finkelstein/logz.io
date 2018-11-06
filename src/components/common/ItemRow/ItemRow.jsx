import React from 'react';
import PropTypes from 'prop-types';

import './ItemRow.css';

export default class ItemRow extends React.PureComponent {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
  };

  render() {
    const { itemId, quantity, price, total, onDeleteItem, onEditItem } = this.props;
    return (
        <tr className="ItemRow-tr">
          <td>{itemId}</td>
          <td>{quantity}</td>
          <td>{price}$ ({total}$)</td>
          <td>
            <button onClick={() => onDeleteItem(itemId)}>Delete</button>
            <button onClick={() => onEditItem(itemId)}>Edit</button>
          </td>
        </tr>
    );
  }
}
