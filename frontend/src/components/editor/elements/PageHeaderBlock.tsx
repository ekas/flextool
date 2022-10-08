import { PageHeader } from "antd";
import { FC } from "react";

interface PageHeaderBlockProps {
  title: string;
  subTitle: string;
}

const PageHeaderBlock: FC<PageHeaderBlockProps> = ({
  title = "Title",
  subTitle = "This is a subtitle",
}) => (
  <PageHeader
    style={{
      border: "1px solid rgb(235, 237, 240)",
      backgroundColor: "rgb(255, 255, 255)",
    }}
    onBack={() => null}
    title={title}
    subTitle={subTitle}
    backIcon={false}
  />
);

export default PageHeaderBlock;
