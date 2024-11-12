export type ButtonUIProps= {
  buttonText: string
  onClick?: () =>  void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}