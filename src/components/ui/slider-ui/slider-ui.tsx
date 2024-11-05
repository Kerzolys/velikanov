import { forwardRef } from 'react'
import { SliderImageUI } from '../slider-image-ui/slider-image-ui'
import { SliderUIProps } from './type'

import styles from './slider-ui.module.scss'

export const SliderUI = forwardRef<HTMLDivElement, SliderUIProps>(({ slides, currentSlide }, ref) => {
  return (
    <div className={styles.slider} ref={ref}>
      {slides.map((slide, index) => {
        return <SliderImageUI 
        link={slide.link} 
        title={slide.title} 
        currentIndex={currentSlide} 
        index={index} />
      })}
    </div>
  )
})