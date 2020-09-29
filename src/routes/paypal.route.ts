import { Request, Response, Router } from "express";
import { CLIENTIDPAYPAL, CLIENTSECRETPAYPAL } from "../globals/enviroment";
import { getConnection, getManager, getRepository } from "typeorm";
import {
  IPaypalUnit,
  IbodyPaypment,
  IPaypalItem,
} from "../models/paypalInterfaces";
import { Inscription } from "../entity/Inscription";
import { User } from "../entity/User";
const paypal = require("@paypal/checkout-server-sdk");
const router = Router();
let environment = new paypal.core.SandboxEnvironment(
  CLIENTIDPAYPAL,
  CLIENTSECRETPAYPAL
);
let client = new paypal.core.PayPalHttpClient(environment);
router.get("/checkoutOrder", async (req, res) => {
  const { typepayment, id_user, idInscription } = req.query;
  let bodyPayment: IbodyPaypment = { intent: "CAPTURE", purchase_units: [] };
  let items = [];
  let request = new paypal.orders.OrdersCreateRequest();
  if (typepayment == "INSCRIPTION") {
    const inscription = await getRepository(Inscription).findOne({
      id: Number(idInscription),
    });
    const user = await getRepository(User).findOne({ id: String(id_user) });
    const unit: IPaypalUnit = {
      description: `${user.name} + ${user.lastName} - ${inscription.name}`,
      amount: { currency: "USD", value: String(inscription.ofertPrice) },
    };
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: "test description",
          amount: {
            currency_code: "USD",
            value: String(inscription.ofertPrice),
          },
        },
      ],
    });
  }

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
