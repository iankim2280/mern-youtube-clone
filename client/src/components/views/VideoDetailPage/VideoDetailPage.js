import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import Axios from "axios";
import SideVideo from "./sections/SideVideo";
import Subscribe from "./sections/Subscribe";

const VideoDetailPage = (props) => {
  // bring from app.js
  const videoId = props.match.params.videoId;
  const [VideoDetail, setVideoDetail] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", videoVariable).then((res) => {
      if (res.data.success) {
        // from router.post("/getVideoDetail"~~ in video.js routerr
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);
  if (VideoDetail.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4em" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            ></video>
            {/* <List.Item
              actions={[<Subscribe userTo={VideoDetail.writer._id} />]}
            > */}
            <List.Item
              actions={[
                <Subscribe
                  userTo={VideoDetail.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                description={VideoDetail.description}
              />
            </List.Item>

            {/* <Comments CommentLists postId refreshFunction /> */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>loading</div>;
  }
};

export default VideoDetailPage;
