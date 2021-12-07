import "./Loading.scss";
export default function Loading({ type }) {
  const SkeletonPost = () => (
    <div className="Skelpost">
      <div className="SkelpostWrapper">
        <div className="SkelpostTop">
          <div className="SkelpostTopLeft">
            <span className="SkelpostProfileImg" />
            <span className="SkelpostUsername"></span>
            <span className="SkelpostDate"></span>
          </div>
          <div className="SkelpostTopRight">
            <span className="SkeltonDot" />
            <span className="SkeltonDot" />
            <span className="SkeltonDot" />
          </div>
        </div>
        <div className="SkelpostBottom">
          <div className="SkeltopBottomLeft">
            <span className="likeIcon" />
            <span className="likeIcon" />
            <span className="postLikeCounter" />
          </div>
          <div className="SkeltopBottomRight">
            <span className="postCommentText" />
          </div>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case "Post":
      return <SkeletonPost />;
    default:
      return;
  }
}
