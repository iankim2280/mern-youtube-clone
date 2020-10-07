import React, { useState } from "react";
import { Form, Typography, message, Input, Button } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
const { Title } = Typography;
const { TextArea } = Input;

const PrivacyOptions = [
  { value: 1, label: "Private" },
  { value: 2, label: "Public" },
];

const CategoryOptions = [
  { value: 1, label: "Film & Animation" },
  { value: 2, label: "Autos & Vehicles" },
  { value: 3, label: "Music" },
  { value: 4, label: "Pets & Animals" },
  { value: 5, label: "Sports" },
];
const VideoUploadPage = (props) => {
  // bring user info from state
  const user = useSelector((state) => state.user);
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0); // default 1, public = 1
  const [Category, setCategory] = useState("Flim & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onVideoTitleChangeHandler = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivacyChangeHandler = (e) => {
    setPrivacy(e.currentTarget.value);
  };
  const onCategoryChangeHandler = (e) => {
    setCategory(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);
    Axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        let variables = {
          url: res.data.url,
          filename: res.data.filename,
        };
        setFilePath(res.data.url);

        Axios.post("/api/video/thumbnail", variables).then((res) => {
          if (res.data.success) {
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
            console.log("thumnail", res.data.url);
          } else {
            alert("Faild to generate a thumbnail");
          }
        });
      } else {
        // alert("Failed to upload a video");

        console.log(res.data);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let variables = {
      // check the redux extension
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Privacy,
      category: Category,
      filePath: FilePath,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };
    Axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        // console.log(res.data);
        message.success("Uploaded successfully.");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        console.log(res.data);
        alert("Failed to upload to server");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop Zone */}
          {/* multiple=false means drop only one file */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid lightgray",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div style={{ fontSize: "3em" }}>hello</div>
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="Thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />

        <label>Title</label>
        <Input onChange={onVideoTitleChangeHandler} value={VideoTitle} />
        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={onDescriptionChangeHandler} value={Description} />
        <br />
        <br />

        <select onChange={onPrivacyChangeHandler}>
          {PrivacyOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={onCategoryChangeHandler}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
