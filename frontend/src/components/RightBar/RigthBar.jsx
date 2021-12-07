import "./RightBar.scss";
import OnlineFriend from "../OnlineFriend/OnlineFriend";
export default function RightBar({ profile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAdImg" src={`${PF}/ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friend</h4>
        <ul className="rightbarFriendList">
          <OnlineFriend />
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <div className="Profile">
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbatFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/1.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>{" "}
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>{" "}
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>{" "}
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>{" "}
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>{" "}
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/2.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/3.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/4.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/images/person/5.jpeg"
              alt=""
              className="rightbarFollwingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
