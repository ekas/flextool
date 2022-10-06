import { Table } from "antd";
import { FC } from "react";

const ComponentName: FC = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "5",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },

    {
      key: "6",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "7",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "8",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "9",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "10",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};

export default ComponentName;
