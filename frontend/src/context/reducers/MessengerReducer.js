import { MessengerConstants } from "../constants/ActionConstant";

const MessengerReducer = (state, action) => {
  switch (action.type) {
    case MessengerConstants.GET_START:
      return {
        conversations: [],
        messages: [],
      };
    case MessengerConstants.GET_SUCCESS:
      return {
        conversations: action.payload.conversations,
        messages: action.payload.messages,
      };
    case MessengerConstants.GET_FAILURE:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MessengerReducer;
