import { Form } from 'admin/components/form/form'
import { ButtonUI } from '../button-ui/button-ui'
import { InputUI } from '../input-ui/input-ui'
import { ModalCalendarEventUIProps } from './type'
import { editEvent, eventsSelector } from 'features/eventsSlice/eventsSlice'
import { useDispatch, useSelector } from 'services/store/store'

import styles from './modal-calendar-event.module.scss'

export const ModalCalendarEventUI: React.FC<ModalCalendarEventUIProps> = ({
  error,
  value,
  onClick
}) => {
  console.log(value)

  const inputs = [
    {
      name: 'date',
      type: 'text',
      placeholder: 'Date',
    },
    {
      name: 'time',
      type: 'text',
      placeholder: 'Time',
    },
    {
      name: 'location',
      type: 'text',
      placeholder: 'Location',
    },
    {
      name: 'program',
      type: 'text',
      placeholder: 'Program',
    },
    {
      name: 'soloist',
      type: 'text',
      placeholder: 'Soloist',
    },
    {
      name: 'link',
      type: 'text',
      placeholder: 'Link',
    }
  ]

  const buttons = [
    {
      buttonText: 'Confirm',
      type: 'submit' as 'submit'
    },
    {
      buttonText: 'Cancel',
      type: 'button' as 'button',
      onClick: onClick
    }
  ]

  // console.log(value.program)


  return (
    <div className={styles.modalCalendarEvent}>

      <Form<{
        date: string
        time: string
        location: string
        program: string[]
        soloist?: string
        link?: string
        id?: string
      }>
        inputs={inputs}
        buttons={buttons}
        formName='calendarEvent'
        formHeader='Change Event'
        inputValues={{
          date: value.date,
          time: value.time,
          location: value.location,
          program: value.program,
          soloist: value.soloist,
          link: value.link
        }}
        inputErrors={{ date: 'Please', time: 'Please', location: 'Please', program: 'Please', soloist: 'Please', link: 'Please' }}
        onClick={onClick}
        action={editEvent}
      />
    </div>
  )
}