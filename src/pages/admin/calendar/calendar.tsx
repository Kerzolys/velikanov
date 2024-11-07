import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ContentCalendar } from "components/content-calendar/calendar-content"
import { CalendarEventUI } from "components/ui/calendar-event-ui/calendar-event-ui"
import { addEvent, eventsSelector } from "features/eventsSlice/eventsSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { testEvents } from "utils/testEvents"

export const AdminCalendar = () => {
  // const [events, setEvents] = useState(testEvents)

  const dispatch = useDispatch()
  const { events } = useSelector(eventsSelector)
  const handleAdd = () => {
    // setEvents(
    //   [...events,
    //   {
    //     date: '15th November 2024',
    //     time: '19:00',
    //     location: 'City',
    //     program: ['Something']
    //   }])
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
      {events.map(event => {
        return <CalendarEventUI date={event.date} time={event.time} location={event.location} program={event.program} />
      })}
      <ButtonUI type='button' buttonText="добавить концерт" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="сохранить" onClick={handleSave} />
    </>
  )
}