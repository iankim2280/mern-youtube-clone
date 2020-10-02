// import { Comment, Avatar } from "antd";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Axios from "axios";

// const SingleComment = (props) => {
//   // bring user info from Redux, you can check it from the redux extension
//   const user = useSelector((state) => state.user);
//   const videoId = props.videoId;

//   const [OpenReply, setOpenReply] = useState(false);

//   const onClickReplyOpen = () => {
//     setOpenReply(!OpenReply);
//   };

//   const [CommentValue, setCommentValue] = useState("");
//   const onHandleChange = (e) => {
//     setCommentValue(e.currentTarget.CommentValue);
//   };

//   const onSubmitForm = (e) => {
//     e.preventDefault();
//     // bring writer(user info) from redux
//     const commentVariable = {
//       writer: user.userData._id,
//       videoId: videoId,
//       content: CommentValue,
//       responseTo: props.comment._id,
//     };

//     Axios.post("/api/comment/saveComment", commentVariable).then((res) => {
//       if (res.data.success) {
//         props.refreshFunction(res.data.result);
//         setCommentValue("");
//       } else {
//         alert("Failed to save comments");
//       }
//     }, []);
//   };

//   // open reply
//   const actions = [
//     <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
//       Reply to
//     </span>,
//   ];
//   return (
//     <div>
//       <Comment
//         actions={actions}
//         author={props.comment.writer.name}
//         avatar={<Avatar src={props.comment.writer.image} alt />}
//         content={<p> {props.comment.content}</p>}
//       />

//       {/* When openReply is true, user can use form */}
//       {OpenReply && (
//         <form style={{ display: "flex" }} onSubmit={onSubmitForm}>
//           <textarea
//             style={{ width: "100%", borderRadius: "5px" }}
//             onChange={onHandleChange}
//             value={CommentValue}
//             placeholder="Leave a commen11t"
//           />
//           <br />
//           <button
//             style={{ width: "20%", height: "52px" }}
//             onClick={onSubmitForm}
//           >
//             {" "}
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };
// export default SingleComment;
import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
// import LikeDislikes from "./LikeDislikes";
const { TextArea } = Input;
function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
