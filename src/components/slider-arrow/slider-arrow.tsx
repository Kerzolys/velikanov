import { SliderArrowUI } from "components/ui/slider-arrow-ui/slider-arrow-ui"
import { SliderArrowProps } from "./type"

export const SliderArrow: React.FC<SliderArrowProps> = ({direction, onClick, isModal}) => {
  return <SliderArrowUI direction={direction} onClick={onClick} isModal={isModal} />
}
