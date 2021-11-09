import { useState, useEffect } from 'react';
import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import PaymentForm from '../PaymentForm';
import AddressForm from '../AddressForm';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payments details'];

const Checkout = ({ cart }) => {
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
        console.log('error generate token', err);
      }
    };

    generateToken();
  }, []);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} />
    );

  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const backStep = () => setActiveStep(prevState => prevState - 1);

  const next = data => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => <div>confirmation</div>;

  return (
    <>
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
