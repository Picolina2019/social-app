import { getAuthData } from './authReducer';

const SET_INITIALIZED = '5_SET_INITIALIZED';

let initialState = {
  initialized: false,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: SET_INITIALIZED });
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
