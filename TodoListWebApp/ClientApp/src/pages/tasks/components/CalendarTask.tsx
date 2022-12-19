import { useContext } from "react";
import ITaskContext from "../context/TaskContext";
import { CalendarPageStage } from "../enums/CalendarPageStage";

interface Prop {
  currentDay: number;
}

const CalendarTasks: React.FC<Prop> = (props) => {
  const { calendarData, setCurrentItemId, setPageStage } =
    useContext(ITaskContext);

  const setCurrentTaskId = (id: number) => {
    setCurrentItemId(id);
    setPageStage(CalendarPageStage.View);
  };

  const renderTasks = calendarData?.map((item) =>
    new Date(item.date).getDate() === props.currentDay ? (
      <div
        onClick={() => setCurrentTaskId(item.id)}
        className="task"
        key={item.id}
      >
        {item.title}
      </div>
    ) : null
  );

  return <>{renderTasks}</>;
};
export default CalendarTasks;
