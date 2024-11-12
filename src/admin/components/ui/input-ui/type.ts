export type InputUIProps = {
  placeholder: string;
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  name?: string | undefined;
  type: string;
};
