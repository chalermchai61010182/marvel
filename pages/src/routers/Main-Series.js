import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Modal, Button, Col } from "antd";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ContainerOutlined } from "@ant-design/icons";
import { sendFavSeries, deleteFavSeries } from "../firebase/setDatafirebase";

const contentStyle = {
  height: "100%",
  width: "100%",
  color: "#fff",
  background: "#f0f0f0", //สีแบคกราว
  border: "none",
};

const alreadyFav = {
  background: "red", //สีแบคกราว
  color: "white",
  border: "none",
};

const cutText = {
  // text-overflow: "ellipsis",
  ellipsizeMode: "tail",
  overflow: "hidden",
  width: "160px",
  height: "1.2em",
  // white-space: "nowrap",
};

const NowPlaying = (props) => {
  const { favouriteItemsSeries, initData } = props;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 500,
    cssEase: "linear",
    className: "center",
    centerMode: true,
    centerPadding: "30px",
  };
  useEffect(() => {
    getAPI();
  }, []); //จะทำเมื่อรีโหลดหน้า

  var Data;
  const getAPI = async () => {
    const API_GATEWAY = "https://gateway.marvel.com/v1/public/series";
    const ts = "0969690829";
    const key = "71e2ecbf2f29260f04e2c7fadc0dc43a";
    const hash = "1c0fc0f4d4ff09f45c21dae5f08a5d79";
    // fetch('https://api.tvmaze.com/search/shows?q=batman')
    // const data = await res.json()
    const res = await fetch(
      `${API_GATEWAY}?ts=${ts}&apikey=${key}&hash=${hash}`
    );
    const data = await res.json();
    console.log(data);
    setComicsData(data.data.results);
    console.log(comicsData);
    Data = data;
    // console.log(data);
    // console.log(data.data.results[9].images[0].path);
    data.data.results.map((x) => {
      // console.log(x.images);
    });
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const [comicsData, setComicsData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { confirm } = Modal;
  function info(item) {
    const isItemFavouriteSeries = isFavouriteSeries(item);

    confirm({
      title: item.title,
      content:
        item.description ||
        "" +
          "The series started in  " +
          item.startYear.toString() +
          " and ended in " +
          item.endYear.toString(),
      icon: <ContainerOutlined />,
      okButtonProps: isItemFavouriteSeries ? { style: alreadyFav } : {},
      okText: isItemFavouriteSeries
        ? "Remove from favourite"
        : "Add to favorites",
      okType: "danger",
      cancelText: "Cancel",

      async onOk() {
        console.log("OK");
        if (isItemFavouriteSeries) await deleteFavSeries(item);
        else await sendFavSeries(item);

        await initData();
        // console.log(item);
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const isFavouriteSeries = ({ title }) =>
    favouriteItemsSeries.find((item) => item.title === title)?.title;

  return (
    <Col>
      <h4
        style={{
          marginTop: "3%",
          marginLeft: "5%",
          fontSize: "20px",
          color: "#000000",
        }}
      >
        Marvel-Series
      </h4>
      <Slider {...settings}>
        {comicsData &&
          comicsData.map((item, index) => (
            <div>
              <Button
                onClick={() => {
                  info(item);
                }}
                style={contentStyle}
              >
                {" "}
                <Image
                  loader={myLoader}
                  src={
                    item?.thumbnail.path + ".jpg" ||
                    "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
                  }
                  alt="Picture of the author" //ชื่อ
                  width={530}
                  height={600}
                />
              </Button>
              <Modal title={item.title} visible={isModalVisible}></Modal>
              <p style={cutText}>{item.title}</p>
            </div>
          ))}
      </Slider>
    </Col>
  );
};
export default NowPlaying;
