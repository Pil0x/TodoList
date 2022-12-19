import { ReactNode, useReducer } from "react";
import CalendarPaginationContext, {
  IPaginationContext,
} from "./CalendarPaginationContext";
import paginationReducer, {
  initialPaginationState,
} from "./CalendarPaginationReducer";

interface Props {
  children?: ReactNode;
}

const CalendarPaginationProvider = ({ children }: Props) => {
  const [calendarPaginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );

  const value: IPaginationContext = {
    calendarPaginationState: calendarPaginationState,
    calendarPaginationDispatch: paginationDispatch,
  };

  return (
    <CalendarPaginationContext.Provider value={value}>
      {children}
    </CalendarPaginationContext.Provider>
  );
};

export default CalendarPaginationProvider;
