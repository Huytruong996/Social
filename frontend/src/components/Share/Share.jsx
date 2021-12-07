import "./Share.scss";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  CreatePostAction,
  UploadFileAction,
} from "../../context/action/PostAction";
import { GetTimeline } from "../../context/action/TimelineAction";
export default function Share() {
  const { user, TimelineDispatch } = useContext(GlobalContext);

  const [urlMedia, seturlMedia] = useState(null);
  const [disable, setDisable] = useState(true);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  let desc = useRef();

  useEffect(() => {
    if (urlMedia || desc.current.value) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [urlMedia]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      const post = await CreatePostAction(newPost);
      if (urlMedia) {
        const data = new FormData();
        const fileName = Date.now() + urlMedia.name;
        data.append("name", fileName);
        data.append(
          "destination",
          `public/assets/images/person/${user._id}/post/${post._id}`
        );
        data.append("file", urlMedia);
        try {
          await UploadFileAction(data, post._id);
          newPost.img = fileName;
        } catch (e) {
          console.log(e);
        }
      }
      await GetTimeline(user._id)(TimelineDispatch);
      setDisable(true);
      seturlMedia(null);
      e.target.reset();
    } catch (e) {}
  };
  const onHandleChange = (e) => {
    desc.current.value = e.target.value;
    if (e.target.value || urlMedia) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <div className="share">
      <form onSubmit={onHandleSubmit}>
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={
                user.profilePicture
                  ? `${PF}/person/${user._id}/avatar/${user.profilePicture}`
                  : PF + "/no-picture.png"
              }
              alt=""
              className="shareProfileImg"
            />
            <input
              placeholder={`What's in your mind ${user.name}?`}
              className="shareInput"
              ref={desc}
              onChange={onHandleChange}
            />
          </div>
          <hr className="shareHr" />
          {urlMedia && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(urlMedia)}
                alt=""
              />
              <Cancel
                className="shareCancelImg"
                onClick={() => seturlMedia(null)}
              />
            </div>
          )}
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <label htmlFor="upload" className="uploadMedia">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <label className="shareOptionText">Photo or Video</label>
                </label>

                <input
                  type="file"
                  id="upload"
                  hidden
                  onChange={(e) => seturlMedia(e.target.files[0])}
                />
              </div>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor=" goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button type="submit" className="shareButton" disabled={disable}>
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
