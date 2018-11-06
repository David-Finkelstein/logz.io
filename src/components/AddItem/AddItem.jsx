import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

import { ERRORS } from '../../constants/addItem';

import './AddItem.css';

const defaultInputFields = {
  name: '',
  price: '',
  quantity: '',
};

export default class AddItem extends React.Component {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...defaultInputFields,
      errorType: '',
    };

    this._onAddItem = this._onAddItem.bind(this);
  }

  render() {
    const { errorType } = this.state;

    return (
        <div className="AddItem">
          {
            Object.keys(defaultInputFields).map((input, index) =>
                <input
                    className="AddItem-input-field"
                    key={index}
                    placeholder={input}
                    value={this.state[input]}
                    name={input}
                    onChange={event => this._onInputValueChanged(event)}
                />)
          }
          <button onClick={this._onAddItem} className="AddItem-btn">Add</button>
          {errorType ? <div><span>{errorType}</span></div> : null}
        </div>
    );
  }

  /**
   * This function fires when a user changes the value in each input fields
   * @param event
   * @private
   */
  _onInputValueChanged(event) {
    let value = event.target.value;

    if (!value) {
      return;
    } else if (event.target.name === 'name') {
      value = value.toLowerCase();
    } else {
      value = parseInt(value) ? parseInt(value) : '';
    }

    this.setState({ [event.target.name]: value });
  };

  /**
   * This function valid the params and fires onAddItem function then adds the item to the cart
   * @private
   */
  _onAddItem() {
    const { name, price, quantity } = this.state;

    let formValidity = true;
    let errorType = undefined;

    if (!validator.isAlpha(name)) {
      formValidity = false;
      errorType = ERRORS.name;
    } else if (!price) {
      formValidity = false;
      errorType = ERRORS.price;
    } else if (!quantity) {
      formValidity = false;
      errorType = ERRORS.quantity;
    }

    if (!formValidity) {
      this.setState({ formValidity, errorType });
    } else {
      this.props.onAddItem(name, price, quantity);
      this.setState({ ...defaultInputFields, errorType: '' });
    }
  }
}
