import { useSelector } from "services/store/store"
import { CalendarEventUI } from "../ui/calendar-event-ui/calendar-event-ui"

import styles from './calendar-content.module.scss'
import { eventsSelector } from "features/eventsSlice/eventsSlice"

export const ContentCalendar = () => {
  const { events } = useSelector(eventsSelector)
  return (
    <div className={styles.calendarContainer}>
      {events.length > 0 ? events.map(event => {
        return <CalendarEventUI
          key={event.id}
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