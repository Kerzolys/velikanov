import { CalendarEventInfoUI } from "../calendar-event-info-ui/calendar-event-info-ui";
import { CalendarEventTitleUI } from "../calendar-event-title-ui/calendar-event-title-ui";
import { ICalendarEvent } from "./type";

import styles from './calendar-event-ui.module.scss'

export const CalendarEventUI: React.FC<ICalendarEvent> = ({ date, time, location, program, soloist, isEditable, onClick }) => {
  return (
    <div onClick={onClick} className={styles.eventBlock}>
      <CalendarEventTitleUI date={date} time={time} location={location} />
      <CalendarEventInfoUI program={program} soloist={soloist} />
    </div>
  )
}