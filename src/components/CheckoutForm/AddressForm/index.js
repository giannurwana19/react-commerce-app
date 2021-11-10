import { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  Button,
  Grid,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../FormInput';
import { commerce } from '../../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map(sO => ({
    id: sO.id,
    label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  }));

  const fetchShippingCountries = async checkoutTokenId => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async countryCode => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );

    // eslint-disable-next-line
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Alamat Pengiriman
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}>
          <Grid container spacing={3}>
            <FormInput name="firstName" label="Nama Depan" />
            <FormInput name="lastName" label="Nama Belakang" />
            <FormInput name="address1" label="Alamat" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="Kota" />
            <FormInput name="zip" label="Kode Pos" />
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
            <Grid item xs={12} sm={6}>
              <InputLabel>Provinsi Pengiriman</InputLabel>
              <Select
                value={shippingSubdivision}
                onChange={e => setShippingSubdivision(e.target.value)}
                fullWidth>
                {subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Pilihan Pengiriman</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={e => setShippingOption(e.target.value)}>
                {options.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Card
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
