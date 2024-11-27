import { CalendarEvent } from "admin/components/calendar-event/calendar-event"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalCalendarEvent } from "admin/components/ui/modal-calendar-event/modal-calendar-event"
import { Modal } from "components/modal/modal"
import { addEvent, eventsSelector } from "features/eventsSlice/eventsSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "services/store/store"
import { EditableEvent } from "services/types"

import styles from './calendar.module.scss'

export const AdminCalendar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<EditableEvent>({
    date: '',
    time: '',
    location: '',
    program: '',
    soloist: ''
  })

  const dispatch = useDispatch()
  const { events } = useSelector(eventsSelector)
  // console.log(events)
  // const location = useLocation()

  const handleAdd = () => setIsOpen(true)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(addEvent({
      ...values,
      program: values.program.split(',').map(item => item.trim()),
    }))
    setIsOpen(false)
  }
  const navigate = useNavigate()

  const handleBack = () => {
    // console.log('changes saved')
    navigate('/admin')
  }

  const handleClose = () => setIsOpen(false)



  return (
    <div className={styles.calendarContainer}>
      {events.map((event, index) => {
        return <CalendarEvent key={index} event={event} />
      })}
      <ButtonUI type='button' buttonText="add event" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="back" onClick={handleBack} />
      {isOpen &&
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalCalendarEvent
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Modal>
      }
    </div>
  )
}