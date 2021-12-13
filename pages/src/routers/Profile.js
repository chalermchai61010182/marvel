import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Profile = (props) => {
  const userProfile = props;

  return (
    <div>
      <h4 style={{ marginLeft: "23%", fontSize: "20px", color: "#000000" }}>
        Line account name : {userProfile?.userInfo?.displayName || ""}
      </h4>

      <img
        src={userProfile?.userInfo?.pictureUrl || ""}
        width="50%"
        height="50%"
        style={{ marginLeft: "23%" }}
      />
    </div>
  );
};

export default Profile;
