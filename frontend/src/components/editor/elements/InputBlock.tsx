import { Input } from "antd";
import React from "react";

interface InputBlockProps {
  placeholder: string;
}

const InputBlock: React.FC<InputBlockProps> = ({ placeholder }) => (
  <Input placeholder={placeholder} />
);

export default InputBlock;
