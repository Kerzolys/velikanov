import { CalendarEvent } from "admin/components/calendar-event/calendar-event"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalCalendarEvent } from "admin/components/ui/modal-calendar-event/modal-calendar-event"
import { ContentCalendar } from "components/content-calendar/calendar-content"
import { Modal } from "components/modal/modal"
import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { addEvent, eventsSelector, removeEvent } from "features/eventsSlice/eventsSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { EditableEvent, TEvent } from "services/types"
import { testEvents } from "utils/testEvents"

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
  console.log(events)

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

  const handleSave = () => {
    console.log('changes saved')
  }

  const handleClose = () => setIsOpen(false)



  return (
    <>
      {events.map((event, index) => {
        return <CalendarEvent key={index} event={event} />
      })}
      <ButtonUI type='button' buttonText="добавить концерт" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="сохранить" onClick={handleSave} />
      {isOpen &&
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalCalendarEvent
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Modal>
      }
    </>
  )
}