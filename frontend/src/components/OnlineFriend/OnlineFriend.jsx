import { useContext, useEffect, useState } from "react";
import "./OnlineFriend.scss";

import { GlobalContext } from "../../context/GlobalContext";
import { GetFriendAction } from "../../context/action/AuthAction";
import { Link } from "react-router-dom";
const OnlineFriend = () => {
  const { user } = useContext(GlobalContext);
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchFriend = async () => {
      const res = await GetFriendAction(user._id);
      setFriends(res);
    };
    fetchFriend();
  }, [user]);
  return (
    <div>
      {friends &&
        friends.map((friend, index) => (
          <Link to={`/messenger/${friend._id}`} key={index}>
            <li className="rightbarFriend" key={index}>
              <div className="rightbarProfileIImgContainer">
                <img
                  src={
                    friend.profilePicture
                      ? `${PF}/person/${friend._id}/avatar/${friend.profilePicture}`
                      : PF + "no-picture.png"
                  }
                  alt=""
                  className="rightbarProfileImg"
                />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUserName">{friend.name}</span>
            </li>
          </Link>
        ))}
    </div>
  );
};

export default OnlineFriend;
