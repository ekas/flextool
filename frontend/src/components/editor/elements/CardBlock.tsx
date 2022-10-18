import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Skeleton } from "antd";

const { Meta } = Card;

interface CardBlockProps {
  loading: boolean;
  cardTitle: string;
  cardDescription: string;
  cardAvatar: string | JSX.Element;
}

const CardBlock: React.FC<CardBlockProps> = ({
  loading,
  cardTitle,
  cardDescription,
  cardAvatar,
}) => {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={cardAvatar}
          title={cardTitle}
          description={cardDescription}
        />
      </Skeleton>
    </Card>
  );
};

export default CardBlock;
