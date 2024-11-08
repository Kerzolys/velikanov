import { TImage } from "services/types";

export type SliderUIProps = {
  slides: TImage[];
  currentSlide: number;
  onClick?: () => void;
  isModal: boolean;
};
