import { CalendarPagination } from "../../enums/CalendarPagination";

export interface ICalendarPaginationAction {
    type: CalendarPagination;
    payload: number;
}

export interface ICalendarPaginationState {
    currentMonth: number;
    currentYear: number;
}

export const initialPaginationState: ICalendarPaginationState = {
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
  };

const paginationReducer = (
state: ICalendarPaginationState,
action: ICalendarPaginationAction
): ICalendarPaginationState => {
const { type, payload } = action;
switch (type) {
    case CalendarPagination.NEXT:
    if (state.currentMonth + payload > 12) {
        return {
        currentMonth: 1,
        currentYear: state.currentYear + payload,
        };
    }
    if(state.currentMonth + payload <= 12){
        return {
            ...state,
            currentMonth: state.currentMonth + payload,
            };
    }
    return state;
    case CalendarPagination.PREV:
    if (state.currentMonth - payload < 1) {
        return {
        currentMonth: 12,
        currentYear: state.currentYear - 1
        };
    }
    if (state.currentMonth - payload >= 1){
        return {
            currentMonth: state.currentMonth - 1,
            currentYear: state.currentYear
        };
    }
    return state;
}
};

export default paginationReducer;