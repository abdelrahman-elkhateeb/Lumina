require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../../utils/catchAsync");
const User = require("../users/userModel");

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const { cartItems, userId } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Map courses to Stripe line items
  const line_items = cartItems.map((course) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: course.title,
        description: course.description || 'Lumina course',
      },
      unit_amount: course.price * 100,
    },
    quantity: course.quantity || 1,
  }));

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&courseIds=${cartItems.map(item => item._id).join(',')}`,
    cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    metadata: {
      userId,
      courseIds: cartItems.map((item) => item._id).join(','),
    },
  });
  res.status(200).json({ url: session.url });
});
