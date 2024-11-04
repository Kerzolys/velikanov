export type ButtonNavbarUIProps = {
  onClick?: () => void;
  isActive?: boolean;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined
}