import "./Post.scss";
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { GetPostAction } from "../../context/action/PostAction";

export default function Post({ post, profile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(post);
  // const friendName = props.author.email.split("@")[0];
  const friendName = "test";
  const { user } = useContext(GlobalContext);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={
                post.userId === user._id
                  ? {
                      pathname: `/profile/${post.userId}`,
                    }
                  : {
                      pathname: `/${friendName}`,
                      state: { _id: post.userId },
                    }
              }
            >
              <img
                src={
                  post.profilePicture
                    ? `${PF}/person/${post.userId}/avatar/${post.profilePicture}`
                    : PF + "no-picture.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{post.desc}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.img && (
            <img
              src={`${PF}/person/${post.userId}/post/${post._id}/${post.img}`}
              alt=""
              className="postImg"
            />
          )}
        </div>
        <div className="postBottom">
          <div className="topBottomLeft">
            <img src={`${PF}/like.png`} alt="" className="likeIcon" />
            <img src={`${PF}/heart.png`} alt="" className="likeIcon" />
            <span className="postLikeCounter">{post.likes.length}</span>
          </div>
          <div className="topBottomRight">
            <span className="postCommentText">0 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
