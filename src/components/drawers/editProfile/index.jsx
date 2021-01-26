import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Image,
  Switch,
  Upload,
  Input,
  Skeleton,
  message,
} from "antd";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editUser } from "../../../screens/authorization/action";
import "./index.css";
import { storage } from "../../../lib/firebase/index";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";

const Index = ({
  setEditProfileDrawer,
  editProfileDrawer,
  getUserData,
  editUser,
  mWeb
}) => {
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState("");
  const [skelton, setSkelton] = useState(true);
  const [fileList, updateFileList] = useState([]);

  useEffect(() => {
    if (editProfileDrawer) {
      setEdit(false);
      setLoading(false);
      setError(false);
      setName(getUserData?.data?.data?.name);
      setBio(getUserData?.data?.data?.about);
    }
  }, [editProfileDrawer]);

  useEffect(() => {
    if (editProfileDrawer) {
      if (getUserData?.data?.data?.email) {
        setLoading(false);
        setEdit(false);
      }
    }
  }, [getUserData]);

  const handleName = (event) => {
    const { value } = event.target;
    if (name === "") {
      setError(false);
    } else if (value === "") {
      setError(true);
    }
    setName(value);
  };

  const submitHandler = async () => {
    if (error) {
      return;
    }
    setLoading(true);
    const userDetails = {};
    userDetails.name = name;
    userDetails.about = bio;
    if (fileList.length) {
      const image = fileList[0].originFileObj;
      const snapshot = await storage.ref(`/userImages/${uuidv4()}`).put(image);
      const url = await snapshot.ref.getDownloadURL();
      userDetails.user_image = url;
    }
    const prevImage = getUserData?.data?.data?.user_image;
    await editUser(userDetails, async () => {
      if (fileList[0]) {
        const deleteRef = storage.refFromURL(prevImage);
        await deleteRef.delete();
        updateFileList([]);
      }
    });
  };

  const notificationHeader = (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Button
        onClick={() => setEditProfileDrawer(false)}
        type="text"
        icon={<LeftOutlined />}
      />
      <span style={{ alignSelf: "center", margin: "0 auto" }}>
        {edit ? "Edit" : "My"} Profile
      </span>
    </div>
  );

  const imageProps = {
    fileList,
    beforeUpload: (file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg"
      ) {
        message.error(`Only png, jpg, jpeg are allowed.`, 3);
        return false;
      }
      return true;
    },
    onChange: (info) => {
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  return (
    <Drawer
      title={notificationHeader}
      placement="right"
      closable={false}
      onClose={() => setEditProfileDrawer(false)}
      visible={editProfileDrawer}
      placement={"left"}
      width={mWeb ? "100%" : "30%"}
    >
      {skelton && <Skeleton avatar paragraph={{ rows: 15 }} />}
      <div
        style={{
          opacity: skelton ? 0 : 1,
        }}
        className="profileDrawer"
      >
        <div className="switch">
          <Switch
            checked={edit}
            defaultChecked
            checkedChildren="Edit Profile"
            unCheckedChildren="My Profile"
            onChange={(checked) => setEdit(checked)}
          />
        </div>
        <div className="userdetails">
          <Image
            width={200}
            src={getUserData?.data?.data?.user_image}
            onLoadCapture={() => setSkelton(false)}
          />
          <span>
            <span style={{ color: "red" }}>@</span>
            {getUserData?.data?.data?.email}
          </span>
        </div>
        {edit && (
          <div className="upload">
            <Upload {...imageProps} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </div>
        )}
        <div className="editable">
          {edit ? (
            <>
              <Input
                value={name}
                placeholder="Name"
                required
                onChange={(event) => handleName(event)}
              />
              <span style={{ opacity: error ? 1 : 0 }} className="error">
                *Name Cannot be empty
              </span>
              <Input.TextArea
                placeholder="About Yourself"
                showCount={edit}
                maxLength={200}
                autoSize={{ minRows: 2, maxRows: 20 }}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              ></Input.TextArea>
            </>
          ) : (
            <>
              <span className="username">{getUserData?.data?.name}</span>
              <blockquote>
                {getUserData?.data?.data?.about?.length
                  ? `"${getUserData?.data?.data?.about}"`
                  : ""}
              </blockquote>
            </>
          )}
        </div>
        {edit && (
          <div className="btncnter">
            <Button
              onClick={submitHandler}
              type="primary"
              className="btn"
              loading={loading}
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  getUserData: state.getUserDetails,
});

export default connect(mapStateToProps, { editUser })(React.memo(Index));
