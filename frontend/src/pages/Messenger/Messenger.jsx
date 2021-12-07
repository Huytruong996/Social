import "./Messenger.scss";
import Topbar from "../../components/Topbar/Topbar";

import { makeStyles } from "@material-ui/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatMenuTop from "../../components/ChatMenuTop/ChatMenuTop";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { GetConversationAction } from "../../context/action/MessengerAction";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";

export default function Messenger() {
  const useStyles = makeStyles({
    chatMenu: {
      backgroundColor: "#FFFF",
    },
    chatBox: {
      backgroundColor: "#FFFF",
      boxShadow: "0 0 1px rgb(0 0 0 / 30%);",
      position: "relative",
    },
    chatMenuMain: {
      height: "calc(100vh - 220px)",
      overflowY: "scroll",
    },
    chatMenuFooter: {
      height: 50,
      boxShadow: "0 0 2px rgb(0 0 0 / 30%)",
    },
  });
  const classes = useStyles();

  const { user, isFetching, conversations, messages, MessengerDispatch } =
    useContext(GlobalContext);

  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessage, setCurrentMessage] = useState([]);
  const [active, setActive] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const GetConversation = async () => {
      await GetConversationAction(user._id)(MessengerDispatch);
    };
    GetConversation();
  }, [user._id, MessengerDispatch]);

  // useEffect(() => {
  //   if (conversations.length > 0) {
  //     setCurrentChat(conversations[0]);
  //     setActive(conversations[0]._id);
  //     setCurrentMessage(
  //       messages.filter(
  //         (message) => message.conversationId === conversations[0]._id
  //       )
  //     );
  //   }
  // }, [conversations, messages]);

  useEffect(() => {
    if (conversations.length > 0 && userId) {
      const conversation = conversations.find((e) =>
        e.members.find((el) => el === userId)
      );
      if (conversation !== undefined) {
        setCurrentChat(conversation);
        setActive(conversation._id);
        setCurrentMessage(
          messages.filter(
            (message) => message.conversationId === conversation._id
          )
        );
      } else {
        <Redirect to="/messenger" />;
      }
    }
  }, [conversations, userId, messages]);
  return (
    <div>
      <Topbar />
      <Grid container>
        <Grid item xs={3} className={classes.chatMenu}>
          <Grid container direction="column">
            <ChatMenuTop />
            {isFetching ? (
              <CircularProgress />
            ) : (
              <Grid item className={classes.chatMenuMain}>
                {conversations &&
                  conversations.map((conversation, index) => {
                    const userRecevieId = conversation.members.filter(
                      (id) => id !== user._id
                    )[0];
                    return (
                      <Link
                        to={`/messenger/${userRecevieId}`}
                        key={index}
                        onClick={() => setActive(conversation._id)}
                      >
                        <Conversation
                          conversation={conversation}
                          active={active === conversation._id}
                        />
                      </Link>
                    );
                  })}
              </Grid>
            )}

            <Grid item className={classes.chatMenuFooter}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} className={classes.chatBox}>
          {currentChat != null ? (
            <ChatBox
              currentChat={currentChat}
              currentMessage={currentMessage}
            />
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
