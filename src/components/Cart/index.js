import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import useStyles from './styles';

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      <Link to="/" className={classes.link}>
        Kamu tidak punya item di dalam keranjang, ayo belanja sekarang!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map(item => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}>
            Hapus semua item
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="primary">
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant="h5" className={classes.title} gutterBottom>
        Keranjang Belanjamu
      </Typography>
      {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
