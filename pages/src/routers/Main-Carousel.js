import { Carousel, Modal, message, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const contentStyle = {
  height: "500px",
  width: "99%",
  color: "#fff",
  background: "#ffffff",

  border: "none",
};

const MarvelCarousel = () => {
  useEffect(() => {
    getAPI();
  }, []); //จะทำเมื่อรีโหลดหน้า

  var Data;
  const getAPI = async () => {
    const API_GATEWAY = "https://gateway.marvel.com/v1/public/comics";
    const ts = "0969690829";
    const key = "71e2ecbf2f29260f04e2c7fadc0dc43a";
    const hash = "1c0fc0f4d4ff09f45c21dae5f08a5d79";
    // fetch('https://api.tvmaze.com/search/shows?q=batman')
    // const data = await res.json()
    const res = await fetch(
      `${API_GATEWAY}?ts=${ts}&apikey=${key}&hash=${hash}`
    );
    const data = await res.json();
    setComicsData(data.data.results);
    Data = data;
    // console.log(data);
    // console.log(data.data.results[9].images[0].path);
    data.data.results.map((x) => {
      console.log(x.images);
    });
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const [comicsData, setComicsData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function info(item) {
    Modal.info({
      title: item.title,
      content: (
        <div>
          <p></p>
        </div>
      ),
    });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Carousel autoplay>
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
                  item?.images[0]?.path + ".jpg" ||
                  "http://i.annihil.us/u/prod/marvel/i/mg/d/70/4bc69c7e9b9d7.jpg"
                }
                alt="Picture of the author" //ชื่อ
                width={330}
                height={500}
              />
            </Button>
            <Modal
              title={item.title}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Add to favorites"
              cancelText="Cancel"
            ></Modal>
            {/* <p>{item.title}</p> */}
          </div>
        ))}
    </Carousel>
  );
};
export default MarvelCarousel;
