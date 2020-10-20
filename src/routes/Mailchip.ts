const mailchip = require('@mailchimp/mailchimp_marketing');
import { Router } from 'express';
import md5 from 'md5';
const app = Router();

mailchip.setConfig({
  apiKey: 'ce3c0c3c92e9abeb68cc80955bc186ac-us2',
  server: 'us2',
});

const audiencieid = '52216e5d5c';

app.post('/webinar', async (req, res) => {
  const { name, lastname, phone, email } = req.body;
  console.log(req.body);

  try {
    const response = await mailchip.lists.setListMember(
      audiencieid,
      md5((email as string).toLowerCase),
      {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: name,
          LNAME: lastname,
          PHONE: phone,
        },
      }
    );
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    const status = error.response.body.status;
    if (status === 400) {
      res.status(400).json({ ok: false, message: 'Usuario registrado' });
    }
  }
});

export default app;
