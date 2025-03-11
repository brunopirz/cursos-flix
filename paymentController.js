// backend/controllers/paymentController.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Criação de sessão de pagamento para assinatura
router.post('/create-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID, // ID do preço configurado no Stripe (R$ 47/mês)
        quantity: 1
      }],
      success_url: process.env.CLIENT_URL + '/payment-success',
      cancel_url: process.env.CLIENT_URL + '/payment-cancel'
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar sessão de pagamento' });
  }
});

module.exports = router;
