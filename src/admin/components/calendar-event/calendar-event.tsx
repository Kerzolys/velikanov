import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { CalendarEventProps } from "./type"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from './calendar-event.module.scss'
import React from "react"

export const CalendarEvent: React.FC<CalendarEventProps> = React.memo(({ event, onEdit, onRemove }) => {
  return (
    <div className={styles.calendarEvent}>
      <CalendarEventUI
        date={event.date}
        time={event.time}
        location={event.location}
        program={event.program}
        soloist={event.soloist}
        link={event.link}
        id={event.id}
      />
      <div className={styles.calendarEvent__buttons}>
        <ButtonUI buttonText='Edit event' onClick={onEdit} className={styles.calendarEvent__button} />
        <ButtonUI buttonText='Remove event' onClick={onRemove} className={styles.calendarEvent__button} />
      </div>
    </div>
  )
})