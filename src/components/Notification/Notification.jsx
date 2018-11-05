import React from 'react';
import PropTypes from 'prop-types';

import './Notification.css';

export default class Notification extends React.Component {
  static propTypes = {
    messageData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      messageData: {},
    };
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.messageData !== prevProps.messageData) {
      this.setState({ messageData: nextProps.messageData });
    }
  }

  render() {
    const { message, color } = this.state.messageData;
    return (
        <div className="Notification">
          <span style={{ color: color }}>{message}</span>
        </div>
    );
  }
}
