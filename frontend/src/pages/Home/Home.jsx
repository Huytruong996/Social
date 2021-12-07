import React from "react";
import "./Home.scss";
import SideBar from "../../components/SideBar/SideBar";
import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RigthBar";

export default function Home({ user }) {
  return (
    <React.Fragment>
      <Topbar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </React.Fragment>
  );
}
