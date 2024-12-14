import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (cardError) {
      setError(cardError.message);
      setIsLoading(false);
      return;
    }

    // Fetch the PaymentIntent from your server
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }), // Specify the amount in cents
    });

    const paymentIntentData = await response.json();

    if (paymentIntentData.error) {
      setError(paymentIntentData.error);
      setIsLoading(false);
      return;
    }

    // Confirm the PaymentIntent with the payment method
    const { error: confirmError } = await stripe.confirmCardPayment(paymentIntentData.client_secret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : "Pay"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Payment successful!</div>}
    </form>
  );
};

export default PaymentForm;
