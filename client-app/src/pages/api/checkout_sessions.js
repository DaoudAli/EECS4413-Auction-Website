const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        // Assuming the items are sent in the request body
        const { items } = req.body; // items should be an array of objects with {name, amount, currency, quantity}

        // Dynamically create lineItems for stripe
        const lineItems = items.map((item) => ({
          price_data: {
            currency: "CAD",
            product_data: {
              name: item.itemName,
            },
            unit_amount: item.itemPrice,
          },
          quantity: item.quantity,
        }));

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: "embedded",
          line_items: lineItems,
          mode: "payment",
          return_url: `https://eecs-4413-auction-website.vercel.app/payment/receipt`,
        });

        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(
          req.query.session_id
        );

        res.send({
          status: session.status,
          customer_email: session.customer_details.email,
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    default:
      res.setHeader("Allow", req.method);
      res.status(405).end("Method Not Allowed");
  }
}
