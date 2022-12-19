import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useContext, useState } from "react";
import { ITask, ITaskRequest } from "../../../../interfaces/ITask";
import ITaskContext from "../../context/TaskContext";

const AddTask = () => {
  const { onSave, onCancel } = useContext(ITaskContext);

  const initialValues: ITaskRequest = {
    title: "",
    description: "",
    date: new Date(),
  };

  const addTask = (values: ITaskRequest) => {
    onSave(values as ITask);
  };

  return (
    <section className="calendar-body">
      <Formik initialValues={initialValues} onSubmit={addTask}>
        <Form>
          <div className="calendar-body-panel-label">Nazwa</div>
          <Field name="title" />
          <div className="calendar-body-panel-label">Opis</div>
          <Field name="description" />
          <div className="calendar-body-panel-label">Data</div>
          <Field name="date" type="datetime-local" />
          <div className="calendar-body-panel-buttons">
            <button type="submit" className="calendar-body-panel-button change">
              Zapisz
            </button>
            <button onClick={onCancel} className="calendar-body-panel-button">
              Anuluj
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default AddTask;
