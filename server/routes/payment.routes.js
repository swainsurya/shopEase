import express from "express";
import Stripe from "stripe";
import "dotenv/config";

const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SK);

// Create a checkout session
paymentRouter.post("/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map(product => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100, // Stripe works with cents
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ error: "Something went wrong with Stripe" });
    }
});

export default paymentRouter;
