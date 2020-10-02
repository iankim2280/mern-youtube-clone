// import React, { useEffect, useState } from "react";
// import { List, Avatar, Row, Col } from "antd";
// import Axios from "axios";
// import SideVideo from "./Sections/SideVideo";
// import Subscribe from "./Sections/Subscribe";
// import Comments from "./Sections/Comments";

// const VideoDetailPage = (props) => {
//   // bring from app.js
//   const videoId = props.match.params.videoId;
//   const [VideoDetail, setVideoDetail] = useState([]);

//   const [CommentsLists, setCommentsLists] = useState([]);
//   const videoVariable = {
//     videoId: videoId,
//   };
//   // console.log("video Variable", videoVariable.videoId);
//   useEffect(() => {
//     Axios.post("/api/video/getVideoDetail", videoVariable).then((res) => {
//       if (res.data.success) {
//         // from router.post("/getVideoDetail"~~ in video.js routerr
//         setVideoDetail(res.data.videoDetail);
//       } else {
//         alert("Failed to get video Info");
//         debugger;
//       }
//     });

//     Axios.post("/api/comment/getComments", videoVariable).then((res) => {
//       if (res.data.success) {
//         setCommentsLists(res.data.comments);
//         console.log("bring comments", res.data.comments);
//       } else {
//         alert("Failed to get video Info");
//       }
//     });
//   }, []);

//   const refreshFunction = (newComment) => {
//     setCommentsLists(CommentsLists.concat(newComment));
//   };

//   if (VideoDetail.writer) {
//     const subscribeButton = VideoDetail.writer._id !==
//       localStorage.getItem("userId") && (
//       <Subscribe
//         userTo={VideoDetail.writer._id}
//         userFrom={localStorage.getItem("userId")}
//       />
//     );
//     return (
//       <Row>
//         <Col lg={18} xs={24}>
//           <div
//             className="postPage"
//             style={{ width: "100%", padding: "3rem 4em" }}
//           >
//             <video
//               style={{ width: "100%" }}
//               src={`http://localhost:5000/${VideoDetail.filePath}`}
//               controls
//             ></video>
//             <List.Item actions={[subscribeButton]}>
//               <List.Item.Meta
//                 avatar={
//                   <Avatar
//                     src={VideoDetail.writer && VideoDetail.writer.image}
//                   />
//                 }
//                 title={<a href="https://ant.design">{VideoDetail.title}</a>}
//                 description={VideoDetail.description}
//               />
//             </List.Item>
//             <Comments
//               refreshFunction={refreshFunction}
//               CommentsLists={CommentsLists}
//               videoId={videoId}
//             />
//           </div>
//         </Col>
//         <Col lg={6} xs={24}>
//           <SideVideo />
//         </Col>
//       </Row>
//     );
//   } else {
//     return <div>loading</div>;
//   }
// };

// export default VideoDetailPage;

import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.videoDetail);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);

  if (Video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4em" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item
              actions={[
                <Subscribe
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
