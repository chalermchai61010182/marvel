import React from "react";
import { Button, Row, Typography, List, Card } from "antd";
import { deleteFav } from "../firebase/setDatafirebase";

const { Title } = Typography;
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Favourite = (props) => {
  const { favouriteItems, initData } = props;
  console.log(favouriteItems);

  return (
    <div>
      <h4 style={{ marginLeft: "5%", fontSize: "20px", color: "#000000" }}>
        Marvel-Comics
      </h4>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={favouriteItems}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} level={2}>
              {/* <Image
                loader={myLoader}
                src={
                  item?.thumbnail.path + ".jpg" ||
                  "http://i.annihil.us/u/prod/marvel/i/mg/d/70/4bc69c7e9b9d7.jpg"
                }
                alt="Picture of the author" //ชื่อ
                width={530}
                height={700}
              /> */}
              <p>{item.thumbnail.path}</p>
            </Card>

            <Card>
              <Button
                type="danger"
                onClick={async () => {
                  await deleteFav(item);
                  initData();
                }}
              >
                ลบ
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Favourite;
