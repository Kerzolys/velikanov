import { SliderArrow } from "components/slider-arrow/slider-arrow";
import { SliderUI } from "components/ui/slider-ui/slider-ui";
import { useEffect, useRef, useState } from "react";
import { testImages } from "utils/testImages";

import styles from './slider.module.scss'
import { SliderProps } from "./type";
import classNames from "classnames";
import { useSelector } from "services/store/store";
import { gallerySelector } from "features/gallerySlice/gallerySlice";

export const Slider: React.FC<SliderProps> = ({ onClick, isModal }) => {
  const { gallery } = useSelector(gallerySelector) || { gallery: [] }

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (gallery.length > 0) {
      setCurrentSlide((current) => (current + 1) % gallery.length);
    }
  };

  const prevSlide = () => {
    if (gallery.length > 0) {
      setCurrentSlide((current) => (current - 1 + gallery.length) % gallery.length);
    }
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
  }, [isModal]);

  console.log(currentSlide)

  return (
    <div className={classNames(styles.slider, { [styles.slider_modal]: isModal })}>
      <SliderArrow direction="backward" onClick={prevSlide} isModal={isModal} />
      <SliderUI onClick={onClick} ref={sliderRef} slides={gallery} currentSlide={currentSlide} isModal={isModal} />
      <SliderArrow direction="forward" onClick={nextSlide} isModal={isModal} />
    </div>
  )
}