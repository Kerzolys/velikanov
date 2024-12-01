import { CalendarEvent } from "admin/components/calendar-event/calendar-event"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { Modal } from "components/modal/modal"
import { addEvent, editEvent, eventsSelector, removeEvent } from "features/eventsSlice/eventsSlice"
import { useState, useMemo, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { TEvent } from "services/types"
import { ModalContentUI } from "admin/components/ui/modal-content-ui/modal-content-ui"
import { useForm } from "features/hooks/useForm"

import styles from './calendar.module.scss'
import { ButtonUIProps } from "admin/components/ui/button-ui/type"
import { InputUIProps } from "admin/components/ui/input-ui/type"
import { PreloaderUI } from "components/ui/preloader-ui/preloader"

export const Calendar = () => {

  const { values, handleChange, setValues } = useForm<Omit<TEvent, 'program'> & { program: string }>({
    date: '',
    time: '',
    location: '',
    program: '',
    soloist: ''
  })
  const [errors, setErrors] = useState<Omit<TEvent, 'program'> & { program: string }>({
    date: '',
    time: '',
    location: '',
    program: '',
    soloist: '',
    link: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const dispatch = useDispatch()
  const { events, loading } = useSelector(eventsSelector)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const validate = () => {
    const newErrors = {
      date: '',
      time: '',
      location: '',
      program: '',
      soloist: '',
      link: '',
    }

    const dateRegex = /\d{1,2}(st|nd|rd|th)?\s[A-Za-z]+\s\d{4}/
    const timeRegex = /(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/
    const locationRegex = /[A-Za-z\s]+,\s[A-Za-z\s]+\s\([A-Za-z\s]+\)/gi
    const programRegex = /([A-Za-z\s\-]+)\s\-\s([A-Za-z\s\d№N]+)(,\s[A-Za-z\s\-]+\s\-\s[A-Za-z\s\d№N]+)*/gi;
    if(!values.date) newErrors.date = 'Date is required'
    else if (!dateRegex.test(values.date)) newErrors.date = 'Invalid date format. It should look like "1st January 2025"'

    if(!values.time) newErrors.time = 'Time is required'
    else if (!timeRegex.test(values.time)) newErrors.time = 'Invalid time format. It should look like "12:00"'
    if(!values.location) newErrors.location = 'Location is required'
    else if (!locationRegex.test(values.location)) newErrors.location = 'Invalid location format. It should look like "Metropolitan Opera House, New York (USA)"'
    if(!values.program) newErrors.program = 'Program is required'
    else if (!programRegex.test(values.program)) newErrors.program = 'Invalid program format. It should look like "Brahms - Symphony N4, Prokofiev - Symphony N5"'

    setErrors(newErrors)
    return !newErrors.date && !newErrors.time && !newErrors.location && !newErrors.program
  }

  useEffect(() => {
    validate()
  },[values])


  const handleAdd = useCallback(() => {
    handleOpen()
    setModalType('add')
    setValues({
      date: "",
      time: "",
      location: "",
      program: "",
      soloist: "",
      link: "",
    });
  }, [handleOpen, setModalType, setValues])

  const handleEdit = useCallback((event: TEvent) => {
    handleOpen();
    setModalType("edit");
    setCurrentEventId(event.id || null);
    setValues({
      ...event,
      program: event.program.join(', '),
    });
  }, [handleOpen, setModalType, setCurrentEventId, setValues]);

  const handleSubmit = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if(validate()) {
      const event: TEvent = {
        ...values,
        program: values.program.split(",").map((item) => item.trim()),
      }
      if (modalType === "add") {
        dispatch(addEvent(event));
  
      } else if (modalType === "edit" && currentEventId) {
        dispatch(editEvent({ ...event, id: currentEventId }));
      }
      if (loading) {
        return <PreloaderUI />
      }
      handleClose()
      setValues({
        date: '',
        time: '',
        location: '',
        program: '',
        soloist: ''
      })
  
    }
  }, [values, modalType, currentEventId, dispatch, loading, setIsOpen, setValues])

  const handleRemove = useCallback((eventId: string) => {
    dispatch(removeEvent({ id: eventId } as TEvent));
  }, [dispatch]);



  const inputs = useMemo<InputUIProps[]>(() => [
    {
      name: "date",
      type: "text",
      placeholder: "Date",
      error: errors.date,
    },
    {
      name: "time",
      type: "text",
      placeholder: "Time",
      error: errors.time,
    },
    {
      name: "location",
      type: "text",
      placeholder: "Location",
      error: errors.location,
    },
    {
      name: "program",
      type: "text",
      placeholder: "Program",
      error: errors.program,
    },
    {
      name: "soloist",
      type: "text",
      placeholder: "Soloist",
      error: errors.soloist,
    },
    {
      name: "link",
      type: "text",
      placeholder: "Link",
      error: errors.link,
    },
  ], [errors])

  const buttons = useMemo<ButtonUIProps[]>(() => [
    {
      buttonText: "Confirm",
      type: "submit" as 'submit',
      onSubmit: handleSubmit,
      disabled:
        values.date.trim() === "" ||
        values.time.trim() === "" ||
        values.location.trim() === "" ||
        values.program.trim() === "",
    },
    {
      buttonText: 'Cancel',
      type: 'button' as 'button',
      onClick: handleClose
    }
  ], [values, handleSubmit, handleClose])

  const memoizedValues = useMemo(() => values, [values]);
  const memoizedHandleChange = useCallback(handleChange, []);
  const memoizedHandleSubmit = useCallback(handleSubmit, [values, modalType, currentEventId]);

  return (
    <div className={styles.calendarContainer}>
      <ButtonUI type='button' buttonText="add event" onClick={handleAdd} />
      {loading && <PreloaderUI />}
      {events.length > 0 ? events.map((event, index) => {
        return <CalendarEvent
          key={event.id}
          event={event}
          onEdit={() => handleEdit(event)}
          onRemove={() => handleRemove(event.id || '')}
        />
      }) : <h2>There is no events. <br /> Please add some!</h2>}
      {isOpen && modalType === 'add' ?
        <Modal key={modalType} isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            values={memoizedValues}
            onClose={handleClose}
            onChange={memoizedHandleChange}
            onSubmit={memoizedHandleSubmit}
            inputs={inputs}
            buttons={buttons}
            formHeader="Add event"
            formName="editEventForm"
          />
        </Modal> :
        <Modal key={modalType} isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            values={memoizedValues}
            onClose={handleClose}
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputs={inputs}
            buttons={buttons}
            formHeader="Edit event"
            formName="editEventForm"
          />
        </Modal>
      }
    </div>
  )
}