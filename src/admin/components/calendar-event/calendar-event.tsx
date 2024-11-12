import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { CalendarEventProps } from "./type"
import { useDispatch } from "services/store/store"
import { useState } from "react"
import { ModalCalendarEvent } from "../ui/modal-calendar-event/modal-calendar-event"
import { Modal } from "components/modal/modal"
import { EditableEvent, TEvent } from "services/types"
import { editEvent, removeEvent } from "features/eventsSlice/eventsSlice"
import { ButtonUI } from "../ui/button-ui/button-ui"

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<EditableEvent>({
    id: event.id,
    date: event.date,
    time: event.time,
    location: event.location,
    program: event.program.join(','),
    soloist: event.soloist,
    link: event.link,
  })
  const dispatch = useDispatch()

  const handleOpenEvent = () => {
    setIsOpen(true)
  }

  const handleClose = () => setIsOpen(false)


  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(editEvent({
      ...values,
      program: values.program.split(',').map(item => item.trim()),
    } as TEvent))
    setIsOpen(false)
  }

  const handleRemove = () => {
    dispatch(removeEvent(event))
  }

  return (
    <>
      <CalendarEventUI
        date={values.date}
        time={values.time}
        location={values.location}
        program={values.program.split(',')}
        soloist={values.soloist}
        link={values.link}
        id={values.id}
        onClick={handleOpenEvent}
      />
      <ButtonUI buttonText='delete нахрен' onClick={handleRemove} />
      {isOpen &&
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalCalendarEvent
            values={values}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </Modal>
      }
    </>
  )
}