import {
  AppBar,
  Avatar,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AddCircle,
  EmojiEmotions,
  EmojiSymbols,
  Gif,
  Info,
  Phone,
  PhotoLibrary,
  ThumbUpAlt,
  Videocam,
} from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GetUserAction } from "../../context/action/AuthAction";
import { SendMessageAction } from "../../context/action/MessengerAction";
import { GlobalContext } from "../../context/GlobalContext";
import socket from "../../helpers/SocketInstance";
import Messages from "../Messages/Messages";

export default function ChatBox({ currentChat, currentMessage }) {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    AppBar: {
      backgroundColor: "#FFFF",
      color: "#1C1C1C",
      boxShadow: "0 0 1px rgb(0 0 0 / 30%);",
    },
    Avatar: {
      marginLeft: 10,
      marginRight: 12,
      marginBottom: 8,
      marginTop: 8,
    },
    chatBoxIconTop: {
      display: "flex",
      boxShadow: "none",
      justifyContent: "flex-end",
      color: "#0084FF",
    },
    ContainerGrid: {
      alignItems: "center",
    },
    chatBoxMain: {
      height: "calc(100vh - 160px)",
    },
    chatBoxMessage: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      margin: " 0 0 10px",
      "& >:first-child": {
        marginTop: "auto !important",
      },
    },
    chatBoxFooter: {
      color: "#0084FF",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-around",
      backgroundColor: "#FFFF",
      wordBreak: "break-word",
      width: "100%",
      bottom: 0,
    },
    chatBoxInput: {
      width: "100%",
      outline: "0",
      wordWrap: "break-word",
      display: "block",
      overflowY: "scroll",
      maxHeight: "inherit",
      minHeight: "16px",
      padding: "5px 0px",
      color: "black",
    },
    chatBoxForm: {
      borderRadius: "30px",
      backgroundColor: "#F0F2F5",
      width: "calc(100% - 200px)",
      display: "flex",
      alignItems: "flex-end",
      boxShadow: "none",
      justifyContent: "space-around",
      padding: "4px 25px",
      maxHeight: "100px",
      wordWrap: "break-word",
      overflowY: "hidden",
      overflowX: "hidden",
      bottom: 0,
    },
    chatBoxFooterContainer: {
      display: "flex",
      minHeight: 50,
      alignItems: "center",
      position: "absolute",
      width: "100%",
      bottom: 0,
      backgroundColor: "#FFFF",
    },
    chatBoxContainer: {
      display: "flex",
      alignItems: "flex-end",
      backgroundColor: "#FFFF",
    },
    chatBoxIcon: {
      padding: "0 5px 0",
    },
  });
  const classes = useStyles();

  const { user } = useContext(GlobalContext);

  const scrollRef = useRef();

  const [userRecevie, setuserRecevie] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState(currentMessage);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const userRecevieId = currentChat.members.filter(
      (id) => id !== user._id
    )[0];
    const getUserRecevie = async () => {
      const res = await GetUserAction(userRecevieId);
      setuserRecevie(res);
    };
    getUserRecevie();
    setMessages(currentMessage);
  }, [currentChat.members, user._id, currentMessage]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data);
      setarrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleMessageInput = (e) => {
    const valueInput = e.target.innerHTML;
    setNewMessage(valueInput);
  };

  const receiverId = currentChat.members.find((member) => member !== user._id);
  const handleKeyPress = async (e) => {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 13 && !e.shiftKey) {
      e.target.innerHTML = "";
      e.preventDefault();
      const inputCheck = newMessage
        .replace(/&nbsp;/gi, "")
        .replace(/<br>/gi, "")
        .trim();
      if (inputCheck) {
        const res = await SendMessageAction({
          conversationId: currentChat._id,
          senderId: user._id,
          text: newMessage,
        });
        socket.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
        setMessages([...messages, res.data]);
      }
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Grid container wrap="nowrap" className={classes.ContainerGrid}>
          <Grid container wrap="nowrap">
            <Avatar
              className={classes.Avatar}
              src={
                userRecevie?.profilePicture
                  ? `${PF}/person/${userRecevie._id}/avatar/${userRecevie.profilePicture}`
                  : ""
              }
            />
            <Grid container direction="column" justifyContent="center">
              <Grid item>
                <Typography component="h5">{userRecevie?.name}</Typography>
              </Grid>
              <Grid item>
                <span>Active 12 minutes ago</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" className={classes.chatBoxIconTop}>
            <Grid item xs={1}>
              <Phone />
            </Grid>
            <Grid item xs={1}>
              <Videocam />
            </Grid>
            <Grid item xs={1}>
              <Info />
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <div className={classes.chatBoxMain}>
        <div className={classes.chatBoxMessage}>
          {messages.map((message, index) => (
            <div ref={scrollRef} key={index}>
              <Messages
                message={message}
                own={message.sender === user._id}
                userRecevie={userRecevie}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={classes.chatBoxFooterContainer}>
        <div className={classes.chatBoxFooter}>
          <Grid item>
            <AddCircle />
          </Grid>
          <Grid item xs={11} className={classes.chatBoxContainer}>
            <Grid item className={classes.chatBoxIcon}>
              <PhotoLibrary />
            </Grid>
            <Grid item className={classes.chatBoxIcon}>
              <EmojiSymbols />
            </Grid>
            <Grid item className={classes.chatBoxIcon}>
              <Gif />
            </Grid>
            <Grid item className={classes.chatBoxForm}>
              <div
                className={classes.chatBoxInput}
                contentEditable="true"
                role="textbox"
                onInput={handleMessageInput}
                onKeyPress={handleKeyPress}
              />
              <EmojiEmotions />
            </Grid>
          </Grid>
          <Grid item>
            <ThumbUpAlt />
          </Grid>
        </div>
      </div>
    </div>
  );
}
