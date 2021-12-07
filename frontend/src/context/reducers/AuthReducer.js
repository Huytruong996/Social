import { AuthConstants } from "../constants/ActionConstant";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthConstants.LOGIN_START:
      return {
        isFetching: true,
      };
    case AuthConstants.LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
      };
    case AuthConstants.LOGIN_FAILURE:
      return {
        isFetching: false,
        error: action.payload,
      };
    case AuthConstants.LOGOUT_SUCCESS:
      return {
        user: null,
        logged: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
