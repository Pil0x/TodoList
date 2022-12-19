import { Formik, Field, Form } from "formik";
import { useContext, useState } from "react";
import { ITaskRequest, ITask } from "../../../../interfaces/ITask";
import ITaskContext from "../../context/TaskContext";

const EditTask = () => {
  const { onSave, onCancel, currentItem } = useContext(ITaskContext);
  //const [initialValues, setInitialValues] = useState<ITask | null>(null);

  const initialValues: ITask = {
    id: currentItem?.id ?? 0,
    title: currentItem?.title ?? "",
    description: currentItem?.description ?? "",
    date: new Date(currentItem?.date ?? new Date(1, 1, 1)),
  };

  const updateTask = (values: ITask) => {
    onSave(values);
  };

  return (
    <section className="calendar-body">
      {initialValues && (
        <Formik initialValues={initialValues} onSubmit={updateTask}>
          <Form>
            <div className="calendar-body-panel-label">Nazwa</div>
            <Field name="title" />
            <div className="calendar-body-panel-label">Opis</div>
            <Field name="description" />
            <div className="calendar-body-panel-label">Data</div>
            <Field name="date" type="datetime-local" />
            <div className="calendar-body-panel-buttons">
              <button
                type="submit"
                className="calendar-body-panel-button change"
              >
                Zapisz
              </button>
              <button onClick={onCancel} className="calendar-body-panel-button">
                Anuluj
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </section>
  );
};

export default EditTask;
