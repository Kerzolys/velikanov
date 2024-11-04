export type CoverSectionProps = {
  gradient: GradientProps;
  image: string;
};

type GradientProps = {
  direction: string
  color1: string;
  color2: string;
  color3?: string;
  color4?: string;
}