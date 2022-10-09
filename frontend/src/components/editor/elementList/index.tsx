import { FC } from "react";
import DraggableTable from "../draggableElements/DraggableTable";
import DraggableArticleBlock from "../draggableElements/DraggableArticleBlock";
import DraggablePageHeaderBlock from "../draggableElements/DraggablePageHeaderBlock";
import DraggableCalendarBlock from "../draggableElements/DraggableCalendarBlock";
import DraggableFormBlock from "../draggableElements/DraggableFormBlock";
import DraggableStepsBlock from "../draggableElements/DraggableStepsBlock";
import DraggableBreadCrumbsBlock from "../draggableElements/DraggableBreadCrumbsBlock";
import DraggableDropDownBlock from "../draggableElements/DraggableDropDownBlock";
import DraggableDatePickerBlock from "../draggableElements/DraggableDatePickerBlock";
import DraggableAutoCompleteBlock from "../draggableElements/DraggableAutoCompleteBlock";
import DraggableTimePickerBlock from "../draggableElements/DraggableTimePickerBlock";
import DraggableAvatarBlock from "../draggableElements/DraggableAvatarBlock";
import DraggableBadgeBlock from "../draggableElements/DraggableBadgeBlock";
import DraggableButtonBlock from "../draggableElements/DraggableButtonBlock";
import DraggableCardBlock from "../draggableElements/DraggableCardBlock";
import DraggableCarouselBlock from "../draggableElements/DraggableCarouselBlock";
import DraggableCheckboxBlock from "../draggableElements/DraggableCheckboxBlock";
import DraggableCollapseBlock from "../draggableElements/DraggableCollapseBlock";
import DraggableDescriptionsBlock from "../draggableElements/DraggableDescriptionsBlock";
import DraggableDividerBlock from "../draggableElements/DraggableDividerBlock";
import DraggableEmptyBlock from "../draggableElements/DraggableEmptyBlock";
import DraggableInputBlock from "../draggableElements/DraggableInputBlock";
import DraggableInputNumberBlock from "../draggableElements/DraggableInputNumberBlock";
import DraggableListBlock from "../draggableElements/DraggableListBlock";

interface ElementListProps {}

const ElementList: FC<ElementListProps> = () => {
  return (
    <>
      <DraggableTable />
      <DraggableArticleBlock />
      <DraggablePageHeaderBlock />
      <DraggableCalendarBlock />
      <DraggableFormBlock />
      <DraggableStepsBlock />
      <DraggableBreadCrumbsBlock />
      <DraggableDropDownBlock />
      <DraggableDatePickerBlock />
      <DraggableAutoCompleteBlock />
      <DraggableTimePickerBlock />
      <DraggableAvatarBlock />
      <DraggableBadgeBlock />
      <DraggableButtonBlock />
      <DraggableCardBlock />
      <DraggableCarouselBlock />
      <DraggableCheckboxBlock />
      <DraggableCollapseBlock />
      <DraggableDescriptionsBlock />
      <DraggableDividerBlock />
      <DraggableEmptyBlock />
      <DraggableInputBlock />
      <DraggableInputNumberBlock />
      <DraggableListBlock />
    </>
  );
};

export default ElementList;
