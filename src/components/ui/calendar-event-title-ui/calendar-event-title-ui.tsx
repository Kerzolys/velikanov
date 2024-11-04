import { TEvent } from "../../../services/types";
import styles from './calendar-event-title-ui.module.scss'

export const CalendarEventTitleUI: React.FC<Partial<TEvent>> = ({date, time, location}) => {
  return (
    <div className={styles.eventTitleBlock}>
      <h2>{date}</h2>
      <h2>{time}</h2>
      <h2>{location}</h2>
    </div>
  )
}