import { Carousel } from "antd";
import React from "react";
import axios from "axios";

const contentStyle = {
  height: "500px",
  width: "95%",
  color: "#fff",
  background: "#364d79",
  marginLeft: "2.5%",
};

const MarvelCarousel = () => {
  const call = async function fetch() {
    // fetch('https://api.tvmaze.com/search/shows?q=batman')
    // const data = await res.json()
    const res = await axios.get("https://gateway.marvel.com/v1/public/comics");
    const data = await res;

    console.log(`Show data fetched. Count: ${data}`);
  };
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}></h3>
      </div>
      <div>
        <h3 style={contentStyle}></h3>
      </div>
      <div>
        <h3 style={contentStyle}></h3>
      </div>
      <div>
        <h3 style={contentStyle}></h3>
      </div>
    </Carousel>
  );
};
export default MarvelCarousel;
