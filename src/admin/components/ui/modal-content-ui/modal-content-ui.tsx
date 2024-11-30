import React from 'react'
import { FormUI } from '../form-ui/form-ui'
import styles from './modal-content-ui.module.scss'
import { ModalContentUIProps } from './type'

export const ModalContentUI: React.FC<ModalContentUIProps> = React.memo(
  ({ values, onChange, onSubmit, inputs, buttons, formHeader, formName }) => {
    return (
      <FormUI
        inputs={inputs}
        buttons={buttons}
        formHeader={formHeader}
        formName={formName}
        values={values}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.values === nextProps.values &&
      prevProps.inputs === nextProps.inputs &&
      prevProps.buttons === nextProps.buttons &&
      prevProps.formHeader === nextProps.formHeader &&
      prevProps.formName === nextProps.formName
    );
  }
);