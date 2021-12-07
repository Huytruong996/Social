import "./Conversation.scss";
import {
  Avatar,
  CardActionArea,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { GetUserAction } from "../../context/action/AuthAction";
export default function Conversation({ conversation, active }) {
  const useStyles = makeStyles({
    root: {
      paddingRight: 5,
      paddingLeft: 5,
    },
    Avatar: {
      marginLeft: 10,
      marginRight: 12,
      marginBottom: 8,
      marginTop: 8,
    },
    CardActionArea: {
      borderRadius: 8,
    },
    CardActionAreaActive: {
      borderRadius: 8,
      backgroundColor: "#F6F6F6",
    },
  });
  const classes = useStyles();
  const { user } = useContext(GlobalContext);

  const [userRecevie, setuserRecevie] = useState(null);
  useEffect(() => {
    const userRecevieId = conversation.members.filter(
      (id) => id !== user._id
    )[0];
    const getUserRecevie = async () => {
      const res = await GetUserAction(userRecevieId);
      setuserRecevie(res);
    };
    getUserRecevie();
  }, [conversation.members, user._id]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={classes.root}>
      <CardActionArea
        className={
          active ? classes.CardActionAreaActive : classes.CardActionArea
        }
      >
        <Grid
          container
          wrap="nowrap"
          className={active && classes.CardActionAreaActive}
        >
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
              <span>anyway whatever</span>
              <span> . </span>
              <span>2 days ago</span>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </div>
  );
}
