import { useState, useEffect } from 'react';
import {
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import PaymentForm from '../PaymentForm';
import AddressForm from '../AddressForm';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

const steps = ['Shipping address', 'Payments details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });

        setCheckoutToken(token);
      } catch (err) {
        history.push('/');
      }
    };

    generateToken();
    // eslint-disable-next-line
  }, []);

  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const backStep = () => setActiveStep(prevState => prevState - 1);

  const next = data => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Terima Kasih Atas Pembeliannya, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Kembali ke halaman utama
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Kembali ke halaman utama
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        backStep={backStep}
        nextStep={nextStep}
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
