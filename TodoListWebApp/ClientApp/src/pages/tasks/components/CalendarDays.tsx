import { useContext } from "react";
import CalendarPaginationContext from "../../../store/calendar/CalendarPaginationContext";
import ITaskContext from "../context/TaskContext";
import CalendarTasks from "./CalendarTask";

const CalendarDays = () => {
  const { calendarPaginationState } = useContext(CalendarPaginationContext);

  const generateFirstDay = () => {
    const firstDay = new Date(
      calendarPaginationState.currentYear,
      calendarPaginationState.currentMonth - 1,
      1
    ).getDay();
    return firstDay - 1;
  };

  const generateLastDay = () => {
    const lastDay = new Date(
      calendarPaginationState.currentYear,
      calendarPaginationState.currentMonth,
      0
    ).getDate();
    return lastDay;
  };
  const getDays = () => {
    let content = [];
    for (
      let index = 0;
      index < generateFirstDay() + generateLastDay();
      index++
    ) {
      if (index >= generateFirstDay()) {
        content.push(
          <div
            className="calendar-body-day"
            key={index - generateFirstDay() + 1}
          >
            {index - generateFirstDay() + 1}
            <CalendarTasks currentDay={index - generateFirstDay() + 1} />
          </div>
        );
      } else {
        content.push(<div key={index - generateFirstDay() + 1}></div>);
      }
    }
    return content;
  };
  return <>{getDays()}</>;
};

export default CalendarDays;
