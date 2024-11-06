import { SliderArrow } from "components/slider-arrow/slider-arrow";
import { SliderUI } from "components/ui/slider-ui/slider-ui";
import { useEffect, useRef, useState } from "react";
import { testImages } from "utils/testImages";

import styles from './slider.module.scss'
import { SliderProps } from "./type";
import classNames from "classnames";

export const Slider: React.FC<SliderProps> = ({ onClick, isModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % testImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + testImages.length) % testImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const startInterval = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  }

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    startInterval()

    const handleMouseEnter = () => {
      stopInterval()
    }

    const handleMouseLeave = () => {
      startInterval()
    }

    if (sliderRef.current) {
      sliderRef.current.addEventListener('mouseenter', handleMouseEnter)
    }

    if (sliderRef.current) {
      sliderRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    if (isModal) {
      stopInterval()
    }

    return () => {
      stopInterval()
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('mouseenter', handleMouseEnter)
        sliderRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    };
  }, []);

  return (
    <div className={classNames(styles.slider, {[styles.slider_modal]: isModal})}>
      <SliderArrow direction="backward" onClick={prevSlide} isModal={isModal} />
      <SliderUI onClick={onClick} ref={sliderRef} slides={testImages} currentSlide={currentSlide} isModal={isModal} />
      <SliderArrow direction="forward" onClick={nextSlide} isModal={isModal} />
    </div>
  )
}