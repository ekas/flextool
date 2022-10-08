import { Table } from "antd";
import { FC } from "react";

type TableColumnProps = {
  title: string;
  dataIndex: string;
  key: string;
};

interface TableBlockProps {
  dataSource: any[];
  columns: TableColumnProps[];
}

const TableBlock: FC<TableBlockProps> = ({ columns, dataSource }) => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default TableBlock;
