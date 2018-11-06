import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  CATEGORY_OPTIONS,
  SORTING_OPTIONS,
  TABLE_ROWS,
} from '../../constants/cart';
import ItemRow from '../common/ItemRow';
import SortBy from '../SortBy/SortBy';

import './Cart.css';

export default class Cart extends React.Component {
  static propTypes = {
    cartItems: PropTypes.array.isRequired,
    totalCartPrice: PropTypes.number.isRequired,
    onClearCart: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isModelOpen: false,
      cartItems: props.cartItems,
      onSorting: false,
      sortBy: { sortBy: undefined, typeOfSorting: undefined },
    };

    this._onDeleteItem = this._onDeleteItem.bind(this);
    this._onEditItem = this._onEditItem.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._onSortByChanged = this._onSortByChanged.bind(this);
    this._onChangeSortParams = this._onChangeSortParams.bind(this);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (!_.isEqual(nextProps.cartItems, prevProps.cartItems)) {
      this.setState({ cartItems: nextProps.cartItems });
    }
  }

  render() {
    const { totalCartPrice, onClearCart } = this.props;
    const { cartItems, onSorting } = this.state;

    return (
        <div className="Cart">
          {onSorting ? this._onSortByChanged() : null}
          <span>Welcome to Logz.io cart!</span>
          {
            cartItems.length > 0 ?
                <SortBy
                    onSorting={this._onChangeSortParams}
                    categoryOptions={CATEGORY_OPTIONS}
                    sortingOptions={SORTING_OPTIONS}
                /> : null
          }

          <div className="Cart-table-block">
            <table className="Cart-table">
              <tbody>
              <tr>
                {TABLE_ROWS.map((row, index) => <th key={index}>{ row }</th>)}
              </tr>
              {
                cartItems.map(
                    ({ itemId, price, quantity, totalPriceForThisItem }, index) =>
                        <ItemRow
                            key={index}
                            itemId={itemId}
                            price={price}
                            quantity={quantity}
                            total={totalPriceForThisItem}
                            onDeleteItem={this._onDeleteItem}
                            onEditItem={this._onEditItem}
                        />)
              }
              </tbody>
            </table>
          </div>
          <span>Total: {totalCartPrice} $</span>
          <div>
            <button
                onClick={onClearCart}
                disabled={cartItems.length === 0}
            >Clear all
            </button>
          </div>
        </div>
    );
  }

  _onDeleteItem(itemId) {
    this.props.onDeleteItem(itemId);
  }

  _onCloseModal() {
    this.setState({ isModelOpen: false });
  }

  _onEditItem() {
    this.setState({ isModelOpen: true });
  }

  /**
   * This function fires when the user changes the sort values in the sort Component usage as callback
   * @param sortBy -
   * @param typeOfSorting
   * @private
   */
  _onChangeSortParams(sortBy, typeOfSorting) {
    this.setState({ onSorting: true, sortPrams: { sortBy, typeOfSorting } });
  }

  _onSortByChanged() {
    const { cartItems } = this.state;
    const { sortBy, typeOfSorting } = this.state.sortPrams;

    if (!sortBy || !typeOfSorting) {
      return;
    }

    let result = cartItems.sort(
        (first, sec) => _sortBetweenTowParams(first[sortBy], sec[sortBy]));

    const sortedCartItems = typeOfSorting === 'ascending' ?
        result :
        result.reverse();
    if (sortedCartItems && !_arraysEqual(cartItems, sortedCartItems)) {
      this.setState({
        cartItems: sortedCartItems,
        onSorting: true,
        sortPrams: { sortBy, typeOfSorting },
      });
    }

  }
}

/**
 * This function compare between two string
 * @param first
 * @param sec
 * @returns {number}
 * @private
 */
function _sortBetweenTowParams(first, sec) {
  if (first < sec) {
    return -1;
  } else if (first > sec) {
    return 1;
  }

  return 0;
}

/**
 * This function checks if the given arrays has the same data the the same order
 * @param firstArray
 * @param secondArray
 * @returns {boolean}
 * @private
 */
function _arraysEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length)
    return false;
  firstArray.forEach((val, index) => {
    if (firstArray[index] !== secondArray[index])
      return false;
  });
  return true;
}
