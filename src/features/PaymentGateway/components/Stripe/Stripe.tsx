import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutPage from './CheckoutPage';

interface Props {
  amount: number;
}

function Stripe({ amount }: Props) {
  const stripePublishableKey = process.env.NEXT_PUBLIC_API_URL;
  const stripePromise = loadStripe(stripePublishableKey as string);

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: amount,
          currency: 'usd',
          loader: 'always',
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}

export default Stripe;
