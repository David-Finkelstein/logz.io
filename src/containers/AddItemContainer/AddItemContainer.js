import { connect } from 'react-redux';
import AddItem from '../../components/AddItem';
import { createAddItemAction } from '../../action-creators/item';

function mapDispatchToProps(dispatch) {
  return {
    onAddItem: (itemId, price, quantity) => {
      dispatch(createAddItemAction(itemId, price, quantity));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddItem);
