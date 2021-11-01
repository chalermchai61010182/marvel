import { Carousel, Modal, message, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { HeartOutlined } from "@ant-design/icons";
import axios from "axios";

const contentStyle = {
  height: "500px",
  width: "95%",
  color: "#fff",
  background: "#364d79",
  marginLeft: "1%",
  border: "none",
};
var Data;
const getAPI = async () => {
  const API_GATEWAY = "https://gateway.marvel.com/v1/public/comics";
  const ts = "0969690829";
  const key = "71e2ecbf2f29260f04e2c7fadc0dc43a";
  const hash = "1c0fc0f4d4ff09f45c21dae5f08a5d79";
  // fetch('https://api.tvmaze.com/search/shows?q=batman')
  // const data = await res.json()
  const res = await fetch(`${API_GATEWAY}?ts=${ts}&apikey=${key}&hash=${hash}`);
  const data = await res.json();
  Data = data;
};

// function hadleDataEdit(index) {
//   console.log(index);
//   router.push(`../src/DataEdit?data=${index}`);
// console.log(data.slice(0, i));
// console.log(data.slice(index + 1));
// }

const MarvelCarousel = () => {
  useEffect(() => {
    getAPI();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleone, setIsModalVisibleone] = useState(false);
  const [isModalVisibletwo, setIsModalVisibletwo] = useState(false);
  const [isModalVisiblethree, setIsModalVisiblethree] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalone = () => {
    setIsModalVisibleone(true);
  };
  const showModaltwo = () => {
    setIsModalVisibletwo(true);
  };

  const showModalthree = () => {
    setIsModalVisiblethree(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsModalVisibleone(false);
    setIsModalVisibletwo(false);
    setIsModalVisiblethree(false);
    message.success("Add to favorites");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleone(false);
    setIsModalVisibletwo(false);
    setIsModalVisiblethree(false);
  };

  return (
    <Carousel autoplay>
      <div>
        <Button onClick={showModal} key="1" style={contentStyle}>
          {" "}
        </Button>
        <Modal
          title="1"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to favorites"
          cancelText="Cancel"
        ></Modal>
      </div>
      <div>
        <Button onClick={showModalone} key="2" style={contentStyle}>
          {" "}
        </Button>
        <Modal
          title="2"
          visible={isModalVisibleone}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to favorites"
          cancelText="Cancel"
        >
          <p>Some contents...</p>
        </Modal>
      </div>
      <div>
        <Button onClick={showModaltwo} key="3" style={contentStyle}>
          {" "}
        </Button>
        <Modal
          title="3"
          visible={isModalVisibletwo}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to favorites"
          cancelText="Cancel"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div>
        <Button onClick={showModalthree} key="4" style={contentStyle}>
          {" "}
        </Button>
        <Modal
          title="4"
          visible={isModalVisiblethree}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add to favorites"
          cancelText="Cancel"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </Carousel>
  );
};
export default MarvelCarousel;
