import { Request, Response, Router } from "express";
import { CLIENTIDPAYPAL, CLIENTSECRETPAYPAL } from "../globals/enviroment";
import { getConnection, getManager } from "typeorm";
import {
  IPaypalUnit,
  IbodyPaypment,
  IPaypalItem,
} from "../models/paypalInterfaces";
import { Inscription } from "../entity/Inscription";
const paypal = require("@paypal/checkout-server-sdk");
const router = Router();
let environment = new paypal.core.SandboxEnvironment(
  CLIENTIDPAYPAL,
  CLIENTSECRETPAYPAL
);
let client = new paypal.core.PayPalHttpClient(environment);
router.get("/checkoutOrder", async (req, res) => {
  const { typepayment, isUser, idInscription } = req.query;

  console.log(typepayment);

  let bodyPayment: IbodyPaypment = { intent: "CAPTURE", purchase_units: [] };
  let items = [];
  if (typepayment == "INSCRIPTION") {
    const inscription = await getConnection().manager.findOne(
      Inscription,
      idInscription
    );
    const unit: IPaypalUnit = {
      description: "my payment",
      amount: { currency: "USD", value: String(inscription.ofertPrice) },
    };
    items.push(unit);
    bodyPayment.purchase_units = items;
  }
  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody(bodyPayment);
  const createOrder = async () => {
    try {
      const response = await client.execute(request);
      console.log(response);
      console.log(response.result.id);

      return response.result;
    } catch (error) {
      console.log(error);

      return error;
    }
  };
  const resp = await createOrder();
  return res.json(resp);
});

export default router;
