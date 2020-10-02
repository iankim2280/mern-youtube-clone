// import Axios from "axios";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import SingleComment from "./SingleComment";

// const Comments = (props) => {
//   const propsCommentLists = props.CommentsLists;
//   console.log(propsCommentLists);
//   // bring user info from Redux, you can check it from the redux extension
//   const user = useSelector((state) => state.user);
//   const videoId = props.videoId;
//   const [CommentValue, setCommentValue] = useState("");
//   const handleClick = (e) => {
//     setCommentValue(e.currentTarget.value);
//   };
//   const SubmitClick = (e) => {
//     e.preventDefault();

//     // bring writer(user info) from redux
//     const commentVariable = {
//       writer: user.userData._id,
//       videoId: videoId,
//       content: CommentValue,
//     };

//     Axios.post("/api/comment/saveComment", commentVariable).then((res) => {
//       if (res.data.success) {
//         console.log(res.data.result);
//         props.refreshFunction(res.data.result);
//         setCommentValue("");
//       } else {
//         alert("Failed to save comments");
//       }
//     }, []);
//   };
//   return (
//     <div>
//       <br />
//       {/* <p>Replies</p> */}
//       <hr />
//       {/* Comments Lists */}
//       {propsCommentLists &&
//         propsCommentLists.map(
//           (comment, index) =>
//             !comment.responseTo && (
//               <SingleComment
//                 key={index}
//                 refreshFunction={props.refreshFunction}
//                 comment={comment}
//                 videoId={props.videoId}
//               />
//             )
//         )}

//       <form style={{ display: "flex" }} onSubmit={SubmitClick}>
//         <textarea
//           style={{ width: "100%", borderRadius: "5px" }}
//           onChange={handleClick}
//           value={CommentValue}
//           placeholder="Leave a comment"
//         >
//           <br />
//         </textarea>
//         <button style={{ width: "20%", height: "52px" }}>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Comments;
import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
// import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {console.log(props.CommentLists)}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
