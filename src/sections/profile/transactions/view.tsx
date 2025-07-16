import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import TransactionsTable from './components/table';
import SubscriptionsCarousel from './components/subscriptions-carousel';
import PaymentMethodsCarousel from './components/payment-methods-carousel';

export default function TransactionsView() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PaymentMethodsCarousel />
        </Grid>

        <Grid item xs={12} md={8}>
          <SubscriptionsCarousel />
        </Grid>

        <Grid item xs={12}>
          <TransactionsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
