import { Request, Response, Router } from "express";
import { CLIENTIDPAYPAL, CLIENTSECRETPAYPAL } from "../globals/enviroment";

const paypal = require("@paypal/checkout-server-sdk");
const router = Router();
let environment = new paypal.core.SandboxEnvironment(
  CLIENTIDPAYPAL,
  CLIENTSECRETPAYPAL
);
let client = new paypal.core.PayPalHttpClient(environment);
router.get("/checkoutOrder", async (req, res) => {
  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        description: "una nueva",
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  });
  const createOrder = async () => {
    const response = await client.execute(request);
    return response;
  };
  return await createOrder();
});

export default router;
