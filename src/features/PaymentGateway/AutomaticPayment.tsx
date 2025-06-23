import Paypal from './components/Paypal';
import PayStack from './components/PayStack';
import Stripe from './components/Stripe/Stripe';

interface Props {
  code: string;
  amount: number;
}
function AutomaticPayment({ code, amount }: Props) {
  const renderPaymentGateway = () => {
    switch (code) {
      case 'stripe':
        return <Stripe amount={amount} />;
      default:
        return (
          <div className="text-center  text-red-500 font-semibold">
            Payment Gateway not found
          </div>
        );
    }
  };
  return <div>{renderPaymentGateway()}</div>;
}

export default AutomaticPayment;
