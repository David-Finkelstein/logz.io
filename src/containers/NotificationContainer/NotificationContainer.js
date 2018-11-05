import { connect } from 'react-redux';
import Notification from '../../components/Notification';

function mapStateToProps(state) {
  return {
    messageData: state.notification.toJS().messageData,
  };
}

export default connect(mapStateToProps, null)(Notification);
