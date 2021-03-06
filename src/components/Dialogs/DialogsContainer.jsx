import { connect } from 'react-redux';
import { compose } from 'redux';
import { AuthRedirect } from '../../components/hoc/AuthRedirect';
import { addMessageActionCreator } from '../../redux/messageReducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    onMessageAddClick: (newMessageText) => {
      dispatch(addMessageActionCreator(newMessageText));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthRedirect
)(Dialogs);
