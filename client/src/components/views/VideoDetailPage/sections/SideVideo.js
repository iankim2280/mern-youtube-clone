import Axios from "axios";
import React, { useEffect, useState } from "react";

const SideVideo = () => {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setSideVideos(res.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderSideVideo = SideVideos.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{
          display: "flex",
          padding: "2rem 2rem 0 2rem",
        }}
      >
        <div style={{ width: "40%", marginBottom: "1rem" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%", paddingLeft: "1rem" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.firstname}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes}:{seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return <React.Fragment>{renderSideVideo}</React.Fragment>;
};

export default SideVideo;
