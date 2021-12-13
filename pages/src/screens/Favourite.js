import React from "react";
import { Button, Row, Typography } from "antd";
import { deleteFav } from "../firebase/setDatafirebase";

const { Title } = Typography;

const Favourite = (props) => {
  const { favouriteItems, initData } = props;

  return (
    <div>
      {favouriteItems.map((item) => (
        <Row>
          <Title level={2}>{item.title}</Title>

          <Button
            type="danger"
            onClick={async () => {
              await deleteFav(item);
              initData();
            }}
          >
            ลบ
          </Button>
        </Row>
      ))}
    </div>
  );
};

export default Favourite;
