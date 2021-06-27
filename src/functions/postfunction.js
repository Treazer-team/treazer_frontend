import axios from "axios";
import BASE_URL from "../api";

const token = localStorage.getItem("token");
const refreshtoken = localStorage.getItem("refresh-token");

const getUserPosts = (postDispatch) => {
  if (token && refreshtoken) {
    axios
      .post(
        `${BASE_URL}/api/posts/getuserposts`,
        {},
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { posts } = res.data;

        postDispatch({ type: "GET_MY_POSTS", payload: posts });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const getSinglePost = (postDispatch, postId) => {
  postDispatch({
    type: "GET_SINGLE_POST",
    payload: postId,
  });
};
const getAllPosts = (postDispatch, { setpostReq }, { postId }, { offSet }) => {
  setpostReq !== undefined && setpostReq(false);
  axios
    .post(`${BASE_URL}/api/posts/getallposts`, { offSet })
    .then((res) => {
      let { posts } = res.data;
      // console.log(posts);
      posts.sort(() => Math.random() - 0.5);
      postDispatch({ type: "GET_ALL_POSTS", payload: posts });
      setpostReq !== undefined && setpostReq(true);
      if (postDispatch !== undefined && postId !== undefined) {
        getSinglePost(postDispatch, postId);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const followORunfollow = (
  id,
  { postId },
  { userState },
  { userDispatch, postDispatch },
  { setisLogin, setFollowMsg, setfollowSnackbarOpen }
) => {
  console.log(id);
  if (!userState.isLogin) {
    setisLogin !== undefined && setisLogin(true);
    console.log("not login");
  } else {
    axios
      .post(
        `${BASE_URL}/api/user/followorunfollowuser`,
        { userId_to_follow_or_unfollow: id },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { msg, followORunfolluser, currentUser } = res.data;
        console.log(msg, followORunfolluser, currentUser);
        setFollowMsg !== undefined && setFollowMsg(msg);
        userDispatch({
          type: "FOLLOW_UNFOLLOW_USER",
          payload: { currentUser, followORunfolluser },
        });
        postDispatch({
          type: "FOLLOW_UNFOLLOW_USER",
          payload: { followORunfolluser, postId },
        });
        setfollowSnackbarOpen !== undefined && setfollowSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const makeComment = (postId, comment, { userState }, { setisLogin, setcomment }, { postDispatch }) => {
  console.log(postId);
  if (userState !== undefined && !userState.isLogin && setisLogin !== undefined) {
    setisLogin(true);
  } else {
    axios
      .post(
        `${BASE_URL}/api/posts/createcomment`,
        { postId, comment },
        {
          headers: {
            "x-token": token,
            "x-refresh-token": refreshtoken,
          },
        }
      )
      .then((res) => {
        const { comments, post: commentPost } = res.data;
        console.log(comments);
        postDispatch({
          type: "ADD_COMMENT_TO_POST",
          payload: { postId, comments },
        });
        // postDispatch({ type: "ADD_COMMENT_TO_MYPOST", payload: {postId, comments} });
        postDispatch({ type: "GET_SINGLE_POST", payload: postId });
        setcomment !== undefined && setcomment("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { getUserPosts, getAllPosts, followORunfollow, makeComment };
