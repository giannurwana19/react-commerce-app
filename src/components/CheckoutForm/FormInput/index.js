import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required = true }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => <TextField label={label} {...field} />}
        name={name}
        control={control}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
}

export default FormInput;
