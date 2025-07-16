import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  autoCapitalize?: string;
};

export default function RHFTextField({
  name,
  helperText,
  type,
  autoCapitalize,
  inputProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={
            type === 'number' &&
            (field.value === 0 || field.value === null || field.value === undefined)
              ? ''
              : field.value
          }
          onChange={(event) => {
            if (type === 'number') {
              const { value } = event.target;
              field.onChange(value === '' ? null : Number(value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          inputProps={{
            ...inputProps,
            ...field,
            autoCapitalize,
          }}
          {...other}
        />
      )}
    />
  );
}
