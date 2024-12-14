const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount,paymentMethodId } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).send({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method: paymentMethodId, // Attach the payment method here
      confirmation_method: "manual", // Optional: for manual confirmation
      confirm: true, // Automatically confirm the payment
    });

    res.status(200).send(paymentIntent);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
