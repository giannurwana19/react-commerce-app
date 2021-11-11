import { useState } from 'react';
import { Button, Divider, TextField, Typography } from '@material-ui/core';
import Review from '../Review';

const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  handleCaptureCheckout,
}) => {
  const [creditCard, setCreditCard] = useState('4242 4242 4242 4242');

  const handleSubmit = async () => {
    if (creditCard !== '4242 4242 4242 4242') {
      alert('No kredit card tidak valid');
      return;
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingsubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: creditCard,
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '94103',
          },
          manual: {
            id: process.env.REACT_APP_PAYMENT_TEST_ID,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Metode Pembayaran (Dibayar dengan kartu kredit)
      </Typography>
      <Typography gutterBottom variant="caption">
        Masukkan No Kartu Kredit (contoh: 4242 4242 4242 4242)
      </Typography>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="No kartu kredit"
          value={creditCard}
          onChange={e => setCreditCard(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Button variant="outlined" onClick={backStep}>
          Kembali
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={creditCard === ''}
          variant="contained">
          Bayar {checkoutToken.live.subtotal.formatted_with_symbol}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
