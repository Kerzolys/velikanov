import { CalendarEvent } from "admin/components/calendar-event/calendar-event"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { Modal } from "components/modal/modal"
import { addEvent, editEvent, eventsSelector, removeEvent } from "features/eventsSlice/eventsSlice"
import { useState, useMemo, useCallback } from "react"
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
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const dispatch = useDispatch()
  const { events, loading } = useSelector(eventsSelector)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)


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
  }, [values, modalType, currentEventId, dispatch, loading, setIsOpen, setValues])

  const handleRemove = useCallback((eventId: string) => {
    dispatch(removeEvent({ id: eventId } as TEvent));
  },[dispatch]);



  const inputs = useMemo<InputUIProps[]>(() => [
    {
      name: "date",
      type: "text",
      placeholder: "Date",
    },
    {
      name: "time",
      type: "text",
      placeholder: "Time",
    },
    {
      name: "location",
      type: "text",
      placeholder: "Location",
    },
    {
      name: "program",
      type: "text",
      placeholder: "Program",
    },
    {
      name: "soloist",
      type: "text",
      placeholder: "Soloist",
    },
    {
      name: "link",
      type: "text",
      placeholder: "Link",
    },
  ], [])

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