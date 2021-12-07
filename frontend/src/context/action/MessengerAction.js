import { MessengerConstants } from "../constants/ActionConstant";
import axiosInstance from "../../helpers/AxiosInstance";

const baseURL = "api/messenger";

export const GetConversationAction = (userId) => async (dispatch) => {
  dispatch({
    type: MessengerConstants.GET_START,
  });

  try {
    const conversations = await axiosInstance().get(
      `${baseURL}/getconversation/${userId}`
    );

    const getMessages = async () => {
      const result = [];
      await Promise.all(
        await conversations.data.map(async (conversation) => {
          const res = await axiosInstance().get(
            `${baseURL}/getmessage/${conversation._id}`
          );
          result.push(...res.data);
        })
      );
      return result;
    };

    const messages = await getMessages();

    dispatch({
      type: MessengerConstants.GET_SUCCESS,
      payload: {
        conversations: conversations.data,
        messages: messages,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const SendMessageAction = async (data) => {
  try {
    const createMessage = await axiosInstance().post(
      `${baseURL}/createmessage/`,
      data
    );
    return createMessage;
  } catch (e) {
    return e;
  }
};
