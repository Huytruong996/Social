import "./Profile.scss";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RigthBar";
import { useLocation } from "react-router-dom";
import { GetUserAction } from "../../context/action/AuthAction";
import { GlobalContext } from "../../context/GlobalContext";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function Profile() {
  const location = useLocation();
  const { user } = useContext(GlobalContext);
  const [infoUser, setInfoUser] = useState(null);
  const userId = location.state?._id || user._id;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchUser = async (userId) => {
      const res = await GetUserAction(userId);
      setInfoUser(res);
    };
    fetchUser(userId);
  }, [userId]);
  return (
    <React.Fragment>
      <Topbar />
      {infoUser && (
        <div className="profile">
          <SideBar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  src={
                    infoUser.profilePicture
                      ? `${PF}/person/${infoUser._id}/avatar/${infoUser.profilePicture}`
                      : PF + "/no-picture.png"
                  }
                  className="profileUserImg"
                  alt=""
                />
                {infoUser.coverPicture && (
                  <img
                    src={`${PF}/person/${infoUser._id}/cover/${infoUser.coverPicture}`}
                    className="profileCoverImg"
                    alt=""
                  />
                )}
                <div className="addCoverImage">
                  <CameraAltIcon />
                  <button className="btnAddCoverImg">Edit Cover Picture</button>
                </div>
              </div>
              <div className="hr-profileCover"></div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{infoUser.name}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed profile={infoUser} />
              <RightBar profile />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
