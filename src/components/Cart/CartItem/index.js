import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent classes={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h6 ">
          {item.price.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary">
          Hapus
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
