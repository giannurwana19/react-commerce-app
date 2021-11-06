import { Grid } from '@material-ui/core';
import Product from './Product';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running Shoes',
    price: '$5',
    image:
      'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 2,
    name: 'Macbook',
    description: 'Apple Macbook',
    price: '$10',
    image:
      'https://images.pexels.com/photos/9096975/pexels-photo-9096975.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

const Products = () => {
  return (
    <main>
      <Grid container justifyContent="center" spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
