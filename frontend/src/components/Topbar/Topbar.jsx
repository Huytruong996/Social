import "./Topbar.scss";
import {
  Chat,
  Person,
  Search,
  Notifications,
  ExitToApp,
} from "@material-ui/icons";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link, useHistory } from "react-router-dom";
import { LogoutAction } from "../../context/action/AuthAction";

export default function Topbar() {
  const { user, AuthDispatch } = useContext(GlobalContext);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleLogout = async () => {
    await LogoutAction(history)(AuthDispatch);
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">DevSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="search-icon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBagde">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Chat />
            </Link>
            <span className="topbarIconBagde">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBagde">1</span>
          </div>
        </div>
        <div className="topbarProfile">
          <img
            src={
              user.profilePicture
                ? `${PF}/person/${user._id}/avatar/${user.profilePicture}`
                : PF + "/no-picture.png"
            }
            alt=""
            className="topbarImg"
          />
          <ul className="Profilesub">
            <li className="log-out" onClick={handleLogout}>
              <ExitToApp />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
