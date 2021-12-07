import axiosInstance from "../../helpers/AxiosInstance";

export const UploadFileAction = async (payload, postId) => {
  await axiosInstance().post(`/api/upload/${postId}`, payload);
};

export const CreatePostAction = async (payload) => {
  try {
    const res = await axiosInstance().post(
      `/api/posts/${payload.userId}/create`,
      payload
    );
    return res.data;
  } catch (e) {}
};

export const GetPostAction = async (postId) => {
  console.log("test");
  const res = await axiosInstance().post("/api/posts/", postId);
  console.log(res);
  return res;
};
