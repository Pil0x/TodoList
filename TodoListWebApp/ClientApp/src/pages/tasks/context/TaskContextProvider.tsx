import { ReactNode, useContext, useEffect, useState } from "react";
import { privateWebApi } from "../../../api/Axios";
import { ApiUrls } from "../../../enums/ApiUrls";
import { CalendarPagination } from "../../../enums/CalendarPagination";
import { useAppSelector } from "../../../hooks/useStore";
import { ICalendarDate, ITask, ITaskRequest } from "../../../interfaces/ITask";
import CalendarPaginationContext from "../../../store/calendar/CalendarPaginationContext";
import { CalendarPageStage } from "../enums/CalendarPageStage";
import TaskContext, { ITaskContextInterface } from "./TaskContext";

interface Props {
  children?: ReactNode;
}

const TaskContextProvider = ({ children }: Props) => {
  const { token } = useAppSelector((state) => state.authentication);

  const { calendarPaginationState, calendarPaginationDispatch } = useContext(
    CalendarPaginationContext
  );

  const initialCurrentDate: ICalendarDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  const [pageStage, setPageStage] = useState<CalendarPageStage>(
    CalendarPageStage.View
  );
  const [currentItem, setCurrentItem] = useState<ITask | null>(null);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<ICalendarDate | null>(
    initialCurrentDate
  );
  const [calendarData, setCalendarData] = useState<ITask[] | null>(null);

  const getTasks = async () => {
    if (!token || !currentDate) return;
    try {
      const response = await privateWebApi(token).get<ITask[]>(
        `${ApiUrls.TASKS}?year=${currentDate.year}&month=${currentDate.month}`
      );
      const responseData = response.data;
      setCalendarData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onChangeItem(null);
    setPageStage(CalendarPageStage.View);
    console.log(calendarPaginationState.currentMonth);
    const getTasks = async () => {
      if (!token || !currentDate) return;
      try {
        const response = await privateWebApi(token).get<ITask[]>(
          `${ApiUrls.TASKS}?year=${calendarPaginationState.currentYear}&month=${calendarPaginationState.currentMonth}`
        );
        const responseData = response.data;
        setCalendarData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [calendarPaginationState.currentMonth]);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const item = calendarData?.find((x) => x.id === currentItemId) ?? null;
    setCurrentItem(item);
  }, [currentItemId]);

  const onChangeItem = (currentItem: ITask | null) => {
    setCurrentItem(currentItem);
  };

  const onChangePage = (currentStage: CalendarPagination) => {
    calendarPaginationDispatch({
      type: currentStage,
      payload: new Date().getDate(),
    });
    console.log(new Date().getDate());
  };

  const onAdd = () => {
    onChangeItem(null);
    setPageStage(CalendarPageStage.Add);
  };

  const onDelete = async () => {
    if (currentItemId != null) {
      await deletePromotion(currentItemId);
    }

    onChangeItem(null);
    setPageStage(CalendarPageStage.View);
  };

  const deletePromotion = async (taskId: number) => {
    if (!token) return;

    try {
      const response = await privateWebApi(token).delete<number>(
        `${ApiUrls.TASKS}/${taskId}/delete`
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
    } finally {
      getTasks();
    }
  };

  const onCancel = () => {
    setPageStage(CalendarPageStage.View);
  };

  const onSave = async (model: ITask) => {
    switch (pageStage) {
      case CalendarPageStage.Add:
        await addPromotion(model);
        break;
      case CalendarPageStage.Edit:
        await updatePromotion(model);
        break;
    }
    getTasks();
  };

  const addPromotion = async (data: ITaskRequest) => {
    if (!token) return;

    try {
      const response = await privateWebApi(token).post<boolean>(
        `${ApiUrls.TASKS}`,
        data
      );

      if (response.data) {
        getTasks();
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const updatePromotion = async (data: ITask) => {
    if (!token) return;

    try {
      const response = await privateWebApi(token).put<boolean>(
        `${ApiUrls.TASKS}/${data.id}/update`,
        data
      );

      if (response.data === true) {
        getTasks();
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const onEdit = () => {
    setPageStage(CalendarPageStage.Edit);
  };

  const value: ITaskContextInterface = {
    onChangePage,
    onChangeItem,
    setCurrentItem,
    setCurrentItemId,
    onAdd,
    onDelete,
    onCancel,
    onSave,
    onEdit,
    setPageStage,
    pageStage,
    currentItem,
    currentItemId,
    calendarData,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
