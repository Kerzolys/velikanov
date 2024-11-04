import { testEvents } from "../../utils/testEvents"
import { CalendarEventUI } from "../ui/calendar-event-ui/calendar-event-ui"

import styles from './calendar-content.module.scss'

export const ContentCalendar = () => {
  return (
    <div className={styles.calendarContainer}>
      {testEvents.length > 0 ? testEvents.map(event => {
        return <CalendarEventUI
          date={event.date}
          time={event.time}
          location={event.location}
          program={event.program}
          soloist={event.soloist}
        />
      }) : <h2>There will be soon some events</h2>}
    </div>
  )
}