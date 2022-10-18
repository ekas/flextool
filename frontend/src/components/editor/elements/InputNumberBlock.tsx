import { InputNumber } from "antd";
import React from "react";

const onChange = (value: number) => {
  console.log("changed", value);
};

interface InputNumberBlockProps {
  placeholder: string;
  min: number;
  max: number;
  defaultValue: number;
}

const InputNumberBlock: React.FC<InputNumberBlockProps> = ({
  placeholder,
  min,
  max,
  defaultValue,
}) => (
  <InputNumber
    min={min}
    max={max}
    defaultValue={defaultValue}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default InputNumberBlock;
