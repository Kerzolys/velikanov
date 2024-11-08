import { TEvent } from "../../../services/types";
import { CalendarEventInfoUI } from "../calendar-event-info-ui/calendar-event-info-ui";
import { CalendarEventTitleUI } from "../calendar-event-title-ui/calendar-event-title-ui";

import styles from './calendar-event-ui.module.scss'

export const CalendarEventUI: React.FC<TEvent> = ({date, time, location, program, soloist}) => {
  return (
    <div className={styles.eventBlock}>
      <CalendarEventTitleUI date={date} time={time} location={location} />
      <CalendarEventInfoUI program={program} soloist={soloist}/>
    </div>
  )
}