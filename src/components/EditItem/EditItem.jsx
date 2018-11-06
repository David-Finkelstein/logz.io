import React from 'react';
import PropTypes from 'prop-types';

import { ERRORS } from '../../constants/addItem';

import './EditItem.css';

const defaultInputFields = {
  quantity: '',
  price: '',
};

export default class EditItem extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...defaultInputFields,
      errorType: '',
    };
    this._onEditItem = this._onEditItem.bind(this);
  }

  render() {
    const { onClose, itemId } = this.props;
    const { errorType } = this.state;
    return (
        <div className="EditItem">
          <div className="EditItem-content">
            <span className="EditItem-close" onClick={onClose}>&times;</span>
            <span>Edit An Item</span>
            <input
                className="EditItem-input-field"
                value={itemId}
                disabled={true}
                onChange={event => this._onInputValueChanged(event)}
            />
            {Object.keys(defaultInputFields).map((input, index) =>
                <input
                    key={index}
                    placeholder={input}
                    className="EditItem-input-field"
                    name={input}
                    value={this.state[input]}
                    onChange={event => this._onInputValueChanged(event)}
                />)}
            <button onClick={this._onEditItem} className="EditItem-save-btn">
              Save
            </button>
            {errorType ? <div><span>{errorType}</span></div> : null}
          </div>
        </div>
    );
  }

  _onInputValueChanged(event) {
    let value = event.target.value;
    value = parseInt(value) || '';
    this.setState({ [event.target.name]: value });
  }

  _onEditItem() {
    const { price, quantity } = this.state;
    const { onEditItem, onClose, itemId } = this.props;

    let formValidity = true;
    let errorType = undefined;

    if (!price) {
      formValidity = false;
      errorType = ERRORS.price;
    } else if (!quantity) {
      formValidity = false;
      errorType = ERRORS.quantity;
    }

    if (!formValidity) {
      this.setState({ formValidity, errorType });
    } else {
      onEditItem(itemId, price, quantity);
      onClose(itemId, price, quantity);
    }
  }
}
