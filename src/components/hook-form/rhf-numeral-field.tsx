import { Controller, useFormContext } from 'react-hook-form';

import IconButton from '@mui/material/IconButton';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import Iconify from '../iconify';

type Props = TextFieldProps & {
  name: string;
  gap?: number;
  itemValue?: number;
  inputMode?: string;
};

export default function RHFNumeralField({
  name,
  gap,
  itemValue,
  helperText,
  type,
  inputMode = 'decimal',
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldValue = field.value;

        const canDisplayMinusButton = gap && itemValue && fieldValue > itemValue + gap;

        const startAdornmentDependingOnGap = canDisplayMinusButton ? (
          <IconButton
            size="small"
            sx={{ marginRight: 2 }}
            onClick={() => {
              field.onChange(Number(field.value) - gap);
            }}
          >
            <Iconify icon="eva:minus-outline" color="white" />
          </IconButton>
        ) : null;

        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
            inputProps={{
              inputMode,
              endAdornment: gap && (
                <IconButton
                  size="small"
                  onClick={() => {
                    field.onChange(Number(field.value) + gap);
                  }}
                >
                  <Iconify icon="eva:plus-outline" color="white" />
                </IconButton>
              ),
              startAdornment: startAdornmentDependingOnGap,
            }}
          />
        );
      }}
    />
  );
}
