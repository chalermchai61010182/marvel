import { Tabs } from "antd";
import React from "react";
import { UserOutlined, HomeOutlined, HeartOutlined } from "@ant-design/icons";
import Carousel from "../routers/Main-Carousel";
import Carouselcomics from "../routers/Main-Carouselcomics";
import Carouselshow from "../routers/Main-Carouselshow";
import { HomeWrapper } from "./style";

const { TabPane } = Tabs;
const contentStyle = { marginLeft: "2.5%", marginRight: "2.5%" };
const contentStyleIcons = {
  marginRight: "5px",
  marginLeft: "5px",
  fontSize: "20px",
  color: "#000000", //สีไอคอน
};

function callback(key) {
  console.log(key);
  console.log("test1");
}

const MarvelTab = () => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Tabs
        style={contentStyle}
        type="card"
        defaultActiveKey="1"
        onChange={callback}
      >
        <TabPane
          tab={
            <span>
              <HomeOutlined style={contentStyleIcons} />
            </span>
          }
          key="1"
        >
          {" "}
          <Carouselshow />
          <Carouselcomics />
        </TabPane>
        <TabPane
          tab={
            <span>
              <HeartOutlined style={contentStyleIcons} />
            </span>
          }
          key="2"
        ></TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined style={contentStyleIcons} />
            </span>
          }
          key="3"
        ></TabPane>
        {/* <TabPane tab="MARVEL" disabled key="4"></TabPane> */}
      </Tabs>
    </div>
  );
};
export default MarvelTab;
