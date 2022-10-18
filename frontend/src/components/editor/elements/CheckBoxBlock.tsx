import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

interface CheckBoxBlockProps {
  label: string;
}

const CheckBoxBlock: React.FC<CheckBoxBlockProps> = ({ label }) => (
  <Checkbox onChange={onChange}>{label}</Checkbox>
);

export default CheckBoxBlock;
