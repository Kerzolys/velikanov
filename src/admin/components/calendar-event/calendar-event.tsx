import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { CalendarEventProps } from "./type"
import { useState } from "react"
import { Modal } from "components/modal/modal"
import { ModalCalendarEventUI } from "../ui/modal-calendar-event/modal-calendar-event"
import { TEvent } from "services/types"

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [eventValue, setEventValue] = useState<TEvent>({
    date: event.date,
    time: event.time,
    location: event.location,
    program: event.program,
    soloist: event.soloist
  })

  console.log(eventValue)
  const handleOpenEdit = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <CalendarEventUI
        onClick={handleOpenEdit}
        date={event.date}
        time={event.time}
        location={event.location}
        program={event.program}
        soloist={event.soloist}
      />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalCalendarEventUI onClick={handleOpenEdit} value={event} />
        </Modal>
      )}
    </>
  )
}