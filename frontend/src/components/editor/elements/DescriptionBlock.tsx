import { Descriptions } from "antd";
import React from "react";

interface DescriptionProps {
  label: string;
  content: string;
}

interface DescriptionBlockProps {
  title: string;
  descriptions: DescriptionProps[];
}

const DescriptionBlock: React.FC<DescriptionBlockProps> = ({
  title,
  descriptions,
}) => (
  <Descriptions title={title}>
    {descriptions.map((description, index) => (
      <Descriptions.Item label={description.label} key={index}>
        {description.content}
      </Descriptions.Item>
    ))}
  </Descriptions>
);

export default DescriptionBlock;
