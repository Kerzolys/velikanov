import classNames from 'classnames'
import styles from './slider-arrow-ui.module.scss'
import { SliderArrowUIProps } from './type'

export const SliderArrowUI: React.FC<SliderArrowUIProps> = ({ direction, onClick, isModal }) => {
  return (
    <button
      className={classNames(styles.arrow, styles[`arrow_${direction}`], { [styles.arrow_modal]: isModal })}
      onClick={onClick}
    />
  )
}