import {
  InputLabel,
  Select,
  Button,
  Grid,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../FormInput';
import { commerce } from '../../../lib/commerce';

const AddressForm = ({ checkoutToken }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async checkoutTokenId => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

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
            <Grid item xs={12} sm={6}>
              <InputLabel>Negara Pengiriman</InputLabel>
              <Select
                value={shippingCountry}
                onChange={e => setShippingCountry(e.target.value)}
                fullWidth>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Bagian Pengiriman</InputLabel>
              <Select value={ } fullWidth onChange={ }>
                <MenuItem key={} value={}>Pilih Saya</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Pilihan Pengiriman</InputLabel>
              <Select value={ } fullWidth onChange={ }>
                <MenuItem key={} value={}>Pilih Saya</MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
