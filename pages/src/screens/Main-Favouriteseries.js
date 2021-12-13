import React from "react";
import { Button, Row, Typography, List, Card } from "antd";
import { deleteFav } from "../firebase/setDatafirebase";

const { Title } = Typography;

const Favourite = (props) => {
  const { favouriteItems, initData } = props;

  return (
    <div>
      <h4 style={{ marginLeft: "5%", fontSize: "20px", color: "#000000" }}>
        Marvel-Marvel-Series
      </h4>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={favouriteItems}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} level={2}></Card>
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
