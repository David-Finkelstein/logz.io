import React from 'react';
import propTypes from 'prop-types';

import { DEFAULT_INPUT_VALUE } from '../../constants/sortBy';

import './SortBy.css';

export default class SortBy extends React.Component {
  static propTypes = {
    onSorting: propTypes.func.isRequired,
    categoryOptions: propTypes.array.isRequired,
    sortingOptions: propTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sortBy: undefined,
      sortOption: undefined,
      categoryOption: undefined,
      isSortInProgress: false,
    };

    this._onSortByChanged = this._onSortByChanged.bind(this);
    this._onTypeOfSortChanged = this._onTypeOfSortChanged.bind(this);
  }

  render() {
    const { categoryOption, sortOption } = this.state;
    const { categoryOptions, sortingOptions } = this.props;

    return (
        <div className="OrderBy">
          <h3 className="OrderBy-header">Order by:</h3>
          <div>
            <label>Sort by: </label>
            <select
                className="OrderBy-sortBy"
                onChange={(element) => this._onSortByChanged(element)}
                value={categoryOption ? categoryOption : DEFAULT_INPUT_VALUE}
            >
              <option
                  key={'OrderBy-sortBy-DEFAULT_INPUT_VALUE'}>{DEFAULT_INPUT_VALUE}</option>
              {
                categoryOptions.map(
                    ({ value, enText }, index) => <option key={index}
                                                        value={value}>{enText}</option>)
              }
            </select>
            {
              categoryOption ?
                  <select
                      className="OrderBy-typeOfSort"
                      onChange={(element) => this._onTypeOfSortChanged(element)}
                      value={sortOption ? sortOption : DEFAULT_INPUT_VALUE}
                  >
                    <option key={'OrderBy-typeOfSort-DEFAULT_INPUT_VALUE'}>
                      {DEFAULT_INPUT_VALUE}
                    </option>
                    {
                      sortingOptions.map((option, index) =>
                          <option key={index} value={option}>{option}</option>)
                    }
                  </select> : null
            }
          </div>
        </div>
    );
  }

  /**
   * This function fires when the user change the sort by keys
   * @param element
   * @private
   */
  _onSortByChanged(element) {
    if (this.state.sortOption) {
      this.setState({ sortOption: undefined });
    }

    this.setState(
        { categoryOption: element.target.value, isSortInProgress: true });
  }

  /**
   * This function fires when the user change the type of sorting by key
   * @param element
   * @private
   */
  _onTypeOfSortChanged(element) {
    const { categoryOption } = this.state;
    this.setState({ sortOption: element.target.value });
    this.props.onSorting(categoryOption, element.target.value);
  }
}
