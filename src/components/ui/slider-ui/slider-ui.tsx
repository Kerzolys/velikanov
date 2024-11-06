import { forwardRef } from 'react'
import { SliderImageUI } from '../slider-image-ui/slider-image-ui'
import { SliderUIProps } from './type'

import styles from './slider-ui.module.scss'
import classNames from 'classnames'

export const SliderUI = forwardRef<HTMLDivElement, SliderUIProps>(({ slides, currentSlide, onClick, isModal }, ref) => {
  return (
    <div className={classNames( {[styles.slider_modal]: isModal, [styles.slider]: !isModal})} ref={ref}>
      {slides.map((slide, index) => {
        return <SliderImageUI 
        key={index}
        onClick={onClick}
        link={slide.link} 
        title={slide.title} 
        currentIndex={currentSlide} 
        index={index} />
      })}
    </div>
  )
})