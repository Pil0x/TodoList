import { useContext } from "react";
import { CalendarPagination } from "../../../enums/CalendarPagination";
import MonthNames from "../../../enums/MonthNames";
import CalendarPaginationContext from "../../../store/calendar/CalendarPaginationContext";
import ITaskContext from "../context/TaskContext";
import { CalendarPageStage } from "../enums/CalendarPageStage";

const CalendarHeader = () => {
  const { onAdd } = useContext(ITaskContext);
  const { calendarPaginationDispatch, calendarPaginationState } = useContext(
    CalendarPaginationContext
  );

  return (
    <section className="calendar-header">
      <h1>{MonthNames(calendarPaginationState.currentMonth)}</h1>
      <div className="calendar-header-buttons">
        <button
          onClick={() =>
            calendarPaginationDispatch({
              type: CalendarPagination.PREV,
              payload: 1,
            })
          }
          className="calendar-header-button"
        >
          ←
        </button>
        <button className="calendar-header-button" onClick={onAdd}>
          Dodaj
        </button>
        <button
          onClick={() =>
            calendarPaginationDispatch({
              type: CalendarPagination.NEXT,
              payload: 1,
            })
          }
          className="calendar-header-button"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default CalendarHeader;
