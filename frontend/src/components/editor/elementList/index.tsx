import { FC } from "react";
import DraggableArticleBlock from "../draggableElements/DraggableArticleBlock";
import DraggablePageHeaderBlock from "../draggableElements/DraggablePageHeaderBlock";
import DraggableCalendarBlock from "../draggableElements/DraggableCalendarBlock";
import DraggableTable from "../draggableElements/DraggableTable";

interface ElementListProps {}

const ElementList: FC<ElementListProps> = () => {
  return (
    <>
      <DraggableTable />
      <DraggableArticleBlock />
      <DraggablePageHeaderBlock />
      <DraggableCalendarBlock />
    </>
  );
};

export default ElementList;
