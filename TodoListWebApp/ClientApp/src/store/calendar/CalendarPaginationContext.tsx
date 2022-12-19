import { Dispatch, createContext } from "react";

import {
  ICalendarPaginationAction,
  ICalendarPaginationState,
  initialPaginationState,
} from "./CalendarPaginationReducer";

export interface IPaginationContext {
  calendarPaginationState: ICalendarPaginationState;
  calendarPaginationDispatch: Dispatch<ICalendarPaginationAction>;
}

export const initialPaginationContext: IPaginationContext = {
  calendarPaginationState: initialPaginationState,
  calendarPaginationDispatch: () => {
    return;
  },
};

const CalendarPaginationContext = createContext<IPaginationContext>(
  initialPaginationContext
);

export default CalendarPaginationContext;
