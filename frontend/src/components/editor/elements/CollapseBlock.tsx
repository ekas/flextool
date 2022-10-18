import { Collapse } from "antd";
import React from "react";

const { Panel } = Collapse;

interface CollapseProps {
  panelHeading: string;
  panelDescription: string;
}

interface CollapseBlockProps {
  data: CollapseProps[];
}

const CollapseBlock: React.FC<CollapseBlockProps> = ({ data }) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      {data.map((panel, index) => (
        <Panel header={panel.panelHeading} key={index}>
          <p>{panel.panelDescription}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default CollapseBlock;
