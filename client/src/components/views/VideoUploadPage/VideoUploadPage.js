import React, { useState } from "react";
import { Form, Typography, message, Input, Button, Icon } from "antd";
import Dropzone from "react-dropzone";
const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pet & Animals" },
  { value: 4, label: "Life Style" },
];

const VideoUploadPage = () => {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0); // default 1, public = 1
  const [Category, setCategory] = useState("Flim & Animation");

  const onVideoTitleChangeHandler = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChangeHandler = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChangeHandler = (e) => {
    setCategory(e.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop Zone */}
          <Dropzone onDrop multiple maxSize>
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
                <Icon type="plus" style={{ fontSize: "3em" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          <div>
            <img src alt />
          </div>
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

        <select onChange={onPrivateChangeHandler}>
          {PrivateOptions.map((item, index) => (
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
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
