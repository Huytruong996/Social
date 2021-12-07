import "./Feed.scss";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  GetProfileTimeline,
  GetTimeline,
  useGetTimeline,
} from "../../context/action/TimelineAction";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";
export default function Feed(props) {
  const {
    user,
    timelinePost,
    isFetching,
    error,
    TimelineDispatch,
    AuthDispatch,
  } = useContext(GlobalContext);

  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(0);

  // const userId = location.state?._id || user._id;
  const userId = "60e098ab1fbc6b48f82e0e7e";

  const { timeline, hasMore, loading, detailPost } = useGetTimeline({
    userId,
    pageNumber,
  });

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  console.log(timeline, hasMore, loading, detailPost);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {detailPost &&
          detailPost.map((post, index) => {
            if (detailPost.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={index}>
                  <Post post={post} profile={props.profile} key={index} />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <Post post={post} profile={props.profile} key={index} />
                </div>
              );
            }
          })}
        <div>{loading && <Loading type="Post" />}</div>
      </div>
    </div>
  );
}
