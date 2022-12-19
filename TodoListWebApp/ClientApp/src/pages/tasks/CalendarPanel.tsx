import { useContext } from "react";
import AddTask from "./components/panelStages/AddTask";
import EditTask from "./components/panelStages/EditTask";
import ViewTask from "./components/panelStages/ViewTask";
import ITaskContext from "./context/TaskContext";
import { CalendarPageStage } from "./enums/CalendarPageStage";

const CalendarPanel = () => {
  const { pageStage } = useContext(ITaskContext);

  const getView = () => {
    switch (pageStage) {
      case CalendarPageStage.Add:
        return <AddTask />;
      case CalendarPageStage.Edit:
        return <EditTask />;
      default:
        return <ViewTask />;
    }
  };

  return <section className="item-container">{getView()}</section>;
};

export default CalendarPanel;
