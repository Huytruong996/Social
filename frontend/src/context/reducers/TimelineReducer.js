import { TimelineConstants } from "../constants/ActionConstant";

const TimelineReducer = (state, action) => {
  switch (action.type) {
    case TimelineConstants.GET_START:
      return {
        isFetching: true,
        timelinePost: null,
      };
    case TimelineConstants.GET_SUCCESS:
      return {
        isFetching: false,
        timelinePost: action.payload,
      };
    case TimelineConstants.GET_FAILURE:
      return {
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default TimelineReducer;
