import classNames from 'classnames'
import styles from './slider-arrow-ui.module.scss'
import { SliderArrowUIProps } from './type'

export const SliderArrowUI: React.FC<SliderArrowUIProps> = ({ direction, onClick }) => {
  return (
    <button className={classNames(styles.arrow, styles[`arrow_${direction}`])} onClick={onClick} />
  )
}