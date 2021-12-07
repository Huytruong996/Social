import { Avatar, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Messages({ message, own, userRecevie }) {
  const useStyles = makeStyles((theme) => ({
    Avatar: {
      marginLeft: 10,
      marginRight: 12,
      marginBottom: 8,
      marginTop: 8,
      width: theme.spacing(4),
      height: theme.spacing(4),
    },

    MessageTextContainer: {
      display: "flex",
      marginBottom: "2px",
    },
    MessageText: {
      marginTop: "auto !important",
      boxShadow: "none",
      backgroundColor: "#E4E6EB",
      padding: "10px 10px",
      borderRadius: "30px",
      wordWrap: "break-word",
      maxWidth: "564px",
    },
    MessageTextOwn: {
      boxShadow: "none",
      backgroundColor: "#0084FF",
      padding: "10px 10px",
      borderRadius: "30px",
      color: "#FFFF",
      wordWrap: "break-word",
      maxWidth: "564px",
    },
    MessageOwn: {
      justifyContent: "flex-end",
    },
  }));
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const friendName = userRecevie?.email.split("@")[0];
  return (
    <div className={classes.MessageContainer}>
      <Grid container className={own && classes.MessageOwn}>
        {!own && (
          <Grid item>
            <Link
              to={{
                pathname: `/${friendName}`,
                state: { _id: userRecevie?._id },
              }}
            >
              <Avatar
                className={classes.Avatar}
                src={
                  userRecevie?.profilePicture
                    ? `${PF}/person/${userRecevie._id}/avatar/${userRecevie.profilePicture}`
                    : ""
                }
              />
            </Link>
          </Grid>
        )}

        <Grid item className={classes.MessageTextContainer}>
          <Paper className={own ? classes.MessageTextOwn : classes.MessageText}>
            <span>{message?.text}</span>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
