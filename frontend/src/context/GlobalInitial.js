export const GlobalInitial = {
  logged: localStorage.getItem("user") || false,
  isFetching: false,
};

export const AUTH_INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
};

export const TIMELINE_INITIAL_STATE = {
  timelinePost: null,
};

export const MESSENGER_INITIAL_STATE = {
  conversations: [],
  messages: [],
};
