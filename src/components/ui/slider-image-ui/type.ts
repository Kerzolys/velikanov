import { TImage } from "services/types";

export interface ISliderImageProps extends TImage {
  index?: number;
  currentIndex?: number;
  onClick?: () => void;
  isAdmin?: boolean;
}