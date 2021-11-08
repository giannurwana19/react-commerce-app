import {
  InputLabel,
  Select,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../FormInput';

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Alamat Pengiriman
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={''}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Nama Depan" />
            <FormInput required name="lastName" label="Nama Belakang" />
            <FormInput required name="address" label="Alamat" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="Kota" />
            <FormInput required name="ZIP" label="Kode Pos" />
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
