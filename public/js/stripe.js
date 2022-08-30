/* eslint-disable */
const Stripe = require('stripe');
const stripe = Stripe(
  'pk_test_51Lc1h4AYgoy55Z8Xt0RAeL75gUOcocrWxwcIDGk5JEndfTbi2bBx3PYR9xKzapmIj4Jgp3tZQwhdbqBzrMvFZaL900yulQpWhp'
);

import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await location.assign(session.data.session.url);

    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
