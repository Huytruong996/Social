import { Fab, Grid, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Add, BorderColor, MoreHoriz, Search } from "@material-ui/icons";

export default function ChatMenuTop() {
  const useStyles = makeStyles({
    root: {
      boxShadow: "none",
    },
    chatMenuTop: {
      paddingTop: 15,
      paddingBottom: 15,
      height: 117,
      boxShadow: "0 0 2px rgb(0 0 0 / 30%)",
    },
    chatMenuTextTop: {
      display: "flex",
      alignItems: "center",
      paddingLeft: 15,
      fontSize: "30px",
      fontWeight: "900",
    },
    chatMenuIconTop: {
      display: "flex",
      justifyContent: "center",
      boxShadow: "none",
    },
    chatMenuContainerTop: {
      paddingBottom: 15,
    },
    chatMenuFormContainerTop: {
      display: "flex",
      justifyContent: "center",
    },
    chatMenuInputTop: {
      width: "100%",
    },
    chatMenuFormTop: {
      borderRadius: "30px",
      backgroundColor: "#F0F2F5",
      width: 400,
      display: "flex",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
      boxShadow: "none",
    },
  });
  const classes = useStyles();
  return (
    <Grid item className={classes.chatMenuTop}>
      <Grid container className={classes.chatMenuContainerTop}>
        <Grid item xs={6} className={classes.chatMenuTextTop}>
          <span>Chat</span>
        </Grid>
        <Grid item xs={2} className={classes.chatMenuIconTop}>
          <Fab size="small" className={classes.root}>
            <MoreHoriz />
          </Fab>
        </Grid>
        <Grid item xs={2} className={classes.chatMenuIconTop}>
          <Fab size="small" className={classes.root}>
            <Add />
          </Fab>
        </Grid>
        <Grid item xs={2} className={classes.chatMenuIconTop}>
          <Fab size="small" className={classes.root}>
            <BorderColor />
          </Fab>
        </Grid>
      </Grid>
      <Grid container className={classes.chatMenuFormContainerTop}>
        <Paper component="form" className={classes.chatMenuFormTop}>
          <Search />
          <InputBase
            className={classes.chatMenuInputTop}
            placeholder="Tìm kiếm trên Messenger"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
