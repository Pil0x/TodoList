import React from "react";
import { CalendarPagination } from "../../../enums/CalendarPagination";
import { ITask } from "../../../interfaces/ITask";
import { CalendarPageStage } from "../enums/CalendarPageStage";

export interface ITaskContextInterface {
  onChangeItem(curentItem: ITask | null): void;
  onChangePage(currentStage: CalendarPagination): void;
  setCurrentItem(currentItem: ITask | null): void;
  setCurrentItemId(currentId: number | null): void;
  onSave(model: ITask): void;
  onEdit(): void;
  onDelete(): void;
  onAdd(): void;
  onCancel(): void;
  setPageStage(stage: CalendarPageStage): void;
  pageStage: CalendarPageStage;
  calendarData: ITask[] | null;
  currentItem: ITask | null;
  currentItemId: number | null;
}

const defaultValue: ITaskContextInterface = {
  onChangeItem: () => {
    return;
  },
  onChangePage: () => {
    return;
  },
  setCurrentItem: () => {
    return;
  },
  setCurrentItemId: () => {
    return;
  },
  onSave: () => {
    return;
  },
  onEdit: () => {
    return;
  },
  onDelete: () => {
    return;
  },
  onAdd: () => {
    return;
  },
  onCancel: () => {
    return;
  },
  setPageStage: () => {
    return;
  },
  pageStage: CalendarPageStage.View,
  calendarData: null,
  currentItem: null,
  currentItemId: null,
};

const ITaskContext = React.createContext<ITaskContextInterface>(defaultValue);
export default ITaskContext;
