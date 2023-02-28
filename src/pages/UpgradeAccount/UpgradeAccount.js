import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import './upgradeaccount.css';
import { REACT_APP_STRIPE_KEY } from '../../utils/constans';
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${REACT_APP_STRIPE_KEY}`);
  }
  return stripePromise;
};
const UpgradeAccount = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: 'price_1M9ejrKWAGAFt5IS6odBorMC',
    quantity: 1,
  };
  const checkoutOption = {
    lineItems: [item],
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };
  const redirectToCheckout = async () => {
    console.log('redirecting to checkout');
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOption);
    console.log('stripe checkout error', error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };
  if (stripeError) alert(stripeError);
  return (
    <div className="checkout">
      <h1>Online Payment</h1>
      <p className="checkout-title">Upgrade to Pro Account</p>
      <p className="checkout-description">Upgrade to Pro account will help you to watch all movie in website</p>
      <h1 className="checkout-price">$20</h1>
      <img
        className="checkout-product-image"
        src={`https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg`}
        alt="Product"
      />
      <button className="checkout-button" onClick={redirectToCheckout} disabled={isLoading}>
        <div className="grey-circle">
          <div className="purple-circle">
            {/* <img className="icon" src={`https://www.bobfinancial.com/images/Prime-CardNew-PNG.png`} alt="credit-card-icon" /> */}
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? 'Loading...' : 'Buy'}</p>
        </div>
      </button>
    </div>
  );
};

export default UpgradeAccount;
