import { CalendarEvent } from "admin/components/calendar-event/calendar-event"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalCalendarEventUI } from "admin/components/ui/modal-calendar-event/modal-calendar-event"
import { ContentCalendar } from "components/content-calendar/calendar-content"
import { Modal } from "components/modal/modal"
import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { addEvent, eventsSelector } from "features/eventsSlice/eventsSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { testEvents } from "utils/testEvents"

export const AdminCalendar = () => {
  // const [events, setEvents] = useState(testEvents)

  const dispatch = useDispatch()
  const { events } = useSelector(eventsSelector)
  console.log(events)
  const handleAdd = () => {

    dispatch(addEvent({
      date: '15th November 2024',
      time: '19:00',
      location: 'City',
      program: ['Something']
    }))
  }

  const handleSave = () => {
    console.log('changes saved')
  }


  return (
    <>
      {events.map((event, index) => {
        return <CalendarEvent key={index} event={event} />
      })}
      <ButtonUI type='button' buttonText="добавить концерт" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="сохранить" onClick={handleSave} />
    </>
  )
}