import { Avatar, List } from "antd";
import React from "react";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];

const ListBlock: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="#">{item.title}</a>}
          description="a design language for background ListBlocklications"
        />
      </List.Item>
    )}
  />
);

export default ListBlock;
