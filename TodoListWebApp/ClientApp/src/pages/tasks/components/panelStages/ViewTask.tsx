import { useContext } from "react";
import ITaskContext from "../../context/TaskContext";

const ViewTask = () => {
  const { currentItem, onDelete, onEdit } = useContext(ITaskContext);

  return currentItem ? (
    <section className="calendar-body">
      <div className="calendar-body-panel-label">Nazwa</div>
      <div className="calendar-body-panel-data">{currentItem.title}</div>
      <div className="calendar-body-panel-label">Opis</div>
      <div className="calendar-body-panel-data">{currentItem.description}</div>
      <div className="calendar-body-panel-label">Data</div>
      <div className="calendar-body-panel-data">
        {new Date(currentItem.date).toDateString()}
      </div>
      <div className="calendar-body-panel-buttons">
        <button onClick={onEdit} className="calendar-body-panel-button change">
          Zmień
        </button>
        <button
          onClick={onDelete}
          className="calendar-body-panel-button delete"
        >
          Usuń
        </button>
      </div>
    </section>
  ) : null;
};
export default ViewTask;
