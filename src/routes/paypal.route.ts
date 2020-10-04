import { Request, Response, Router } from "express";
import { CLIENTIDPAYPAL, CLIENTSECRETPAYPAL } from "../globals/enviroment";
import {
  getConnection,
  getCustomRepository,
  getManager,
  getRepository,
} from "typeorm";
import { DetailInscriptionController } from "../controllers/DetailInscription";
import { Inscription } from "../entity/Inscription";
import { User } from "../entity/User";
import { DetailInscription } from "../entity/DetailInscription";
import { IDetailInscription } from "../models/interfaces";
const paypal = require("@paypal/checkout-server-sdk");
const router = Router();
let environment = new paypal.core.SandboxEnvironment(
  CLIENTIDPAYPAL,
  CLIENTSECRETPAYPAL
);
let client = new paypal.core.PayPalHttpClient(environment);
router.get("/checkoutOrder", async (req, res) => {
  const { typepayment, id_user, idInscription } = req.query;
  let request = new paypal.orders.OrdersCreateRequest();
  let user = await getRepository(User).findOne({ id: String(id_user) });
  const inscription = await getRepository(Inscription).findOne({
    id: Number(idInscription),
  });
  if (typepayment == "INSCRIPTION") {
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `${user.name} + ${user.lastName} - ${inscription.name}`,
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
      /// create detail inscription
      const detail = await getCustomRepository(
        DetailInscriptionController
      ).createDetailInscription({
        idPago: response.result.id,
        idUser: user.id,
        idInscription: inscription.id,
        status: false,
      });

      if (detail instanceof DetailInscription) {
        return res
          .status(200)
          .json({ ok: true, result: response.result, idetail: detail.id });
      } else {
        return res.status(400).json({ ok: false, detail });
      }
    } catch (error) {
      return res.status(400).json({ ok: false });
    }
  };
  await createOrder();
});

router.get("/notifypaymen", async (req, res) => {
  const { typepayment, idDetail, data } = req.query;
  // veryfy page inscription
  if (typepayment == "INSCRIPTION") {
    //SEARCH DETAIL  INSCRIPTION
    const detail = await getCustomRepository(
      DetailInscriptionController
    ).searchDetailInscription({
      id: idDetail,
    });
    if (detail[0] instanceof DetailInscription) {
      detail[0].metadata = String(data);
      // update Detail Incription
      const updateDetail = await getCustomRepository(
        DetailInscriptionController
      ).updateDetailInscription(
        Object.assign({} as IDetailInscription, detail[0]),
        detail[0].id
      );
      if (updateDetail instanceof DetailInscription) {
        res.status(200).json({ ok: true, res: updateDetail });
      }
    }
  } else {
    res.status(400).json({ ok: false });
  }
});

export default router;
