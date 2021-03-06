import { Tabs } from "antd";
import { UserOutlined, HomeOutlined, HeartOutlined } from "@ant-design/icons";
import Characters from "./Main-Carouselcharacters";
import Carouselshow from "../routers/Main-Carouselshow";
import {
  allMyFav,
  allMyFavCharacters,
  allMyFavSeries,
} from "../../../firebase/setDatafirebase";
import React, { useEffect, useState } from "react";
import Series from "../routers/Main-Series";
import Profile from "./Profile";
import MainFavourtie from "../screens/Main-Favourite";
import Favseries from "../screens/Main-Favouriteseries";
import Favcha from "../screens/Main-Favouritecharac";

// import liff from "@line/liff/dist/lib";
// import Profile from "../routers/Profile";

const { TabPane } = Tabs;
// useEffect(() => {
//   const getUserId = localStorage.getItem("UserId");
// }, []); //จะทำเมื่อรีโหลดหน้า

const MarvelTab = () => {
  const contentStyle = { marginLeft: "2.5%", marginRight: "2.5%" };
  const contentStyleIcons = {
    marginRight: "5px",
    marginLeft: "5px",
    fontSize: "20px",
    color: "#000000", //สีไอคอน
  };

  async function callback(key) {
    // const [Fav, setFav] = useState();
    console.log(key);
  }

  // const MarvelTab = () => {
  // const [data, setData] = useState(allMyFav(localStorage.getItem("UserId")));
  const [fav, setFav] = useState([]);
  const [fav1, setFav1] = useState();
  const [fav2, setFav2] = useState();
  const [fav3, setFav3] = useState();
  const [fav4, setFav4] = useState();

  const [userInfo, setUserInfo] = useState();
  const initData = async () => {
    setFav(allMyFav(window.localStorage.getItem("UserId")));
    const favFirestore = await allMyFav(window.localStorage.getItem("UserId"));
    setFav1(favFirestore);

    const favFirestoreCharacters = await allMyFavCharacters(
      window.localStorage.getItem("UserId")
    );
    setFav2(favFirestoreCharacters);

    const favFirestoreSeries = await allMyFavSeries(
      window.localStorage.getItem("UserId")
    );
    setFav3(favFirestoreSeries);

    console.log("PlsSe>>", favFirestoreSeries);
  };
  const initProfile = async () => {
    const getUserInfo = await JSON.parse(localStorage.getItem("UserInfo"));
    setUserInfo(getUserInfo);
  };

  useEffect(() => {
    initData();
    initProfile();
  }, []); //รีเฟรสข้อมูลไม่เกิดเออเร่อ

  console.log(fav2);
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
          <Carouselshow initData={initData} favouriteItems={fav1 || []} />
          <Characters
            initData={initData}
            favouriteItemsCharacters={fav2 || []}
          />
          <Series initData={initData} favouriteItemsSeries={fav3 || []} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <HeartOutlined style={contentStyleIcons} />
            </span>
          }
          key="2"
        >
          {/* <Favourtie initData={initData} favouriteItems={fav1 || []} /> */}
          {/* <MainFavourtie initData={initData} favouriteItems={fav1 || []} /> */}
          <MainFavourtie initData={initData} favouriteItems={fav1 || []} />
          <Favcha initData={initData} favouriteItemsCharacters={fav2 || []} />
          <Favseries initData={initData} favouriteItemsSeries={fav3 || []} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined style={contentStyleIcons} />
            </span>
          }
          key="3"
        >
          {/* <Profile /> */}
          <Profile userInfo={userInfo || []} />
        </TabPane>
        {/* <TabPane tab="MARVEL" disabled key="4"></TabPane> */}
      </Tabs>
    </div>
  );
};
export default MarvelTab;
