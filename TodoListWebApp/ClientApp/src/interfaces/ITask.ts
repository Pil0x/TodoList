export interface ITask {
    id: number;
    title: string;
    description: string;
    date: Date;
}

export interface ITaskRequest {
    title: string;
    description: string;
    date: Date;
}

export interface ICalendarDate {
    month: number;
    year: number;
}