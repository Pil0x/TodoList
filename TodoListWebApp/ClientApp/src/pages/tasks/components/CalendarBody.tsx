import { useState } from "react";
import CalendarDays from "./CalendarDays";

const CalendarBody = () => {
  return (
    <section className="calendar-body">
      <div className="calendar-body-days">
        <div className="calendar-body-label">Poniedziałek</div>
        <div className="calendar-body-label">Wtorek</div>
        <div className="calendar-body-label">Środa</div>
        <div className="calendar-body-label">Czwartek</div>
        <div className="calendar-body-label">Piątek</div>
        <div className="calendar-body-label">Sobota</div>
        <div className="calendar-body-label">Niedziela</div>
        <CalendarDays />
      </div>
      {/* <button onClick={generateCalendar}>przycisk</button> */}
    </section>
  );
};

export default CalendarBody;
