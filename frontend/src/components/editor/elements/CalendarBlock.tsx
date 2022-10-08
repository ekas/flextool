import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import { FC } from "react";

interface CalendarBlockProps {
  mode?: CalendarMode;
}

const CalendarBlock: FC<CalendarBlockProps> = ({ mode }) => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return <Calendar onPanelChange={onPanelChange} mode={mode} />;
};

export default CalendarBlock;
