export type InputUIProps = {
  placeholder: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | undefined
  name?: string
  type: string
}