export type ButtonUIProps= {
  buttonText: string
  onClick?: () =>  void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}