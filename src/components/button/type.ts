export type ButtonNavbarProps = {
  onClick?: () => void;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isActive?: boolean;
}