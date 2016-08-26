import AppDispatcher from '../AppDispatcher'
import Constants from '../Constants'

const ServerActions = {
  receiveProfile(profile) {
    AppDispatcher.dispatch({
      type: Constants.RECEIVE_PROFILE,
      profile
    })
  },
  removeProfile(profile) {
    AppDispatcher.dispatch({
      type: Constants.REMOVE_PROFILE
    })
  },

  editprofile(profile){
    AppDispatcher.dispatch({
      type:Constants.EDIT_PROFILE
    })
  }
};

export default ServerActions;
