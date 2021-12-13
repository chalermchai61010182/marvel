import React from "react";
import { Button, Row, Typography, List, Card } from "antd";
import { deleteFavSeries } from "../firebase/setDatafirebase";
import Image from "next/image";

const { Title } = Typography;
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Favourite = (props) => {
  const { favouriteItemsSeries, initData } = props;

  return (
    <div>
      <h4 style={{ marginLeft: "5%", fontSize: "20px", color: "#000000" }}>
        Marvel-Marvel-Series
      </h4>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={favouriteItemsSeries}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} level={2}>
              <Image
                loader={myLoader}
                src={
                  item?.thumbnail.path + ".jpg" ||
                  "http://i.annihil.us/u/prod/marvel/i/mg/d/70/4bc69c7e9b9d7.jpg"
                }
                alt="Picture of the author" //ชื่อ
                width="250%"
                height="300%"
              />
              <p></p>
              <Button
                type="danger"
                onClick={async () => {
                  await deleteFavSeries(item);
                  initData();
                }}
              >
                Delete
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Favourite;
