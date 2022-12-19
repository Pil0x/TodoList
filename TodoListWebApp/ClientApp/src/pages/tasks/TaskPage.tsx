import CalendarPaginationProvider from "../../store/calendar/CalendarPaginationProvider";
import CalendarPanel from "./CalendarPanel";
import CalendarBody from "./components/CalendarBody";
import CalendarHeader from "./components/CalendarHeader";
import TaskContextProvider from "./context/TaskContextProvider";

const TaskPage = () => {
  return (
    <section className="app-container">
      <section className="calendar-container">
        <CalendarPaginationProvider>
          <TaskContextProvider>
            <CalendarHeader />
            <CalendarBody />
            <CalendarPanel />
          </TaskContextProvider>
        </CalendarPaginationProvider>
      </section>
    </section>
  );
};

export default TaskPage;
