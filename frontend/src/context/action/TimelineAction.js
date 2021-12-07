import { TimelineConstants } from "../constants/ActionConstant";
import axiosInstance from "../../helpers/AxiosInstance";
import { useEffect, useState } from "react";
import axios from "axios";

export async function GetTimeline({ userId, pageNumber, TimelineDispatch }) {
  // const [hasMore, setHasMore] = useState(false);

  TimelineDispatch({
    type: TimelineConstants.GET_START,
  });

  try {
    const getPost = async () => {
      try {
        const post = await axiosInstance().post(
          `/api/posts/timeline?page=${pageNumber}`,
          {
            userId,
          }
        );
        return post.data;
      } catch (e) {
        console.log(e);
      }
    };
    const posts = await getPost();
    posts.sort((p1, p2) => {
      return (
        new Date(p2.detailPost.createdAt) - new Date(p1.detailPost.createdAt)
      );
    });
    setTimeout(
      () =>
        TimelineDispatch({
          type: TimelineConstants.GET_SUCCESS,
          payload: posts,
        }),
      1000
    );
  } catch (e) {
    console.log(e);
    TimelineDispatch({
      type: TimelineConstants.GET_FAILURE,
      payload: e,
    });
  }
}

export function useGetTimeline({ userId, pageNumber }) {
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [detailPost, setdetailPost] = useState([]);
  const [oldLength, setOldLength] = useState(0);
  // TimelineDispatch({
  //   type: TimelineConstants.GET_START,
  // });

  // useEffect(() => {
  //   let cancel;
  //   axios({
  //     method: "POST",
  //     url: `/api/posts/timeline?page=${pageNumber}`,
  //     cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       setTimeline((prevPosts) => {
  //         return [...new Set([...prevPosts, ...res.data])];
  //       });
  //       setHasMore(res.data.length > 0);
  //     })
  //     .catch((e) => {
  //       if (axios.isCancel(e)) return;
  //     });

  //   timeline.sort((p1, p2) => {
  //     return (
  //       new Date(p2.detailPost.createdAt) - new Date(p1.detailPost.createdAt)
  //     );
  //   });
  //   return () => cancel();
  // }, [pageNumber, userId, timeline]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "POST",
      url: `http://localhost:8800/api/posts/timeline`,
      params: { id: userId, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(async (res) => {
        // console.log(res);
        const data = res.data;
        setTimeline((prevPosts) => {
          return [...new Set([...prevPosts, ...data])];
        });
        setOldLength(res.data.length);
        // console.log("oldLength :", oldLength, "newLength :", newLength);
        setHasMore(data.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancel();
  }, [pageNumber, userId]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const fetchDetailPost = async (timeline) => {
        // console.log(timeline);
        let dataRes = [];
        const data = await Promise.all(
          timeline.map(async (postId) => {
            const res = await axiosInstance().post("/api/posts/", { postId });
            // console.log(postId, res.data);

            dataRes.push(res.data);
            // console.log(dataRes);
          })
        );
        return dataRes;
      };
      const newLength = timeline.length;
      if (newLength === 0) {
        const dataTest = await fetchDetailPost(timeline);
        setTimeout(() => setdetailPost(dataTest), 1000);
      }
      if (newLength > oldLength) {
        const dataTest = await fetchDetailPost(timeline);
        setTimeout(() => setdetailPost(dataTest), 1000);
      }
    };
    getData();
    setLoading(false);
  }, [oldLength, timeline]);

  console.log(timeline, oldLength);
  return { timeline, hasMore, loading, detailPost };
}

export const GetProfileTimeline = (userId) => async (dispatch) => {
  dispatch({
    type: TimelineConstants.GET_START,
  });

  const getPost = async () => {
    try {
      const post = await axiosInstance().post("/api/posts/profile", {
        userId,
      });
      return post.data;
    } catch (e) {
      console.log(e);
    }
  };

  try {
    const posts = await getPost();

    posts.sort((p1, p2) => {
      return (
        new Date(p2.detailPost.createdAt) - new Date(p1.detailPost.createdAt)
      );
    });
    setTimeout(
      () =>
        dispatch({
          type: TimelineConstants.GET_SUCCESS,
          payload: posts,
        }),
      1000
    );
  } catch (e) {
    dispatch({
      type: TimelineConstants.GET_FAILURE,
      payload: e,
    });
  }
};
