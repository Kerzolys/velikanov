import { TEvent } from "../../../services/types";
import styles from './calendar-event-info-ui.module.scss'

export const CalendarEventInfoUI: React.FC<Partial<TEvent>> = ({ program, soloist }) => {
  return (
    <div className={styles.eventInfoBlock}>
      {program?.map((work, index) => {
        return <p key={index}>{work}</p>
      })}
      <p className={styles.eventInfoBlock__soloist}>{soloist}</p>
    </div>
  )
}