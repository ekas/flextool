import { FC } from "react";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "constants/DragTypes";

import "./index.less";

const DraggableTable: FC = () => {
  const [, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: {
      name: "TableBlock",
      displayName: "",
      props: {
        columns: [
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
        ],
        dataSource: [
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
        ],
      },
      position: { x: 50, y: 50, width: 320, height: 669 },
    },
  });
  return (
    <div ref={drag} className="draggableComponent">
      Table
    </div>
  );
};

export default DraggableTable;
