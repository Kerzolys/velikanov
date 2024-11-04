export type ButtonUIProps = {
  onClick: () => void;
  buttonText?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}