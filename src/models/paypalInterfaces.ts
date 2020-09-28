export interface IbodyPaypment {
  intent: "CAPTURE";
  purchase_units: IPaypalUnit[];
}

export interface IPaypalUnit {
  description: string;
  amount: {
    currency: string;
    value: string;
  };
  items?: IPaypalItem[];
}
export interface IPaypalItem {
  name: string;
  quantity: string;
  unit_amount: {
    currency_code: "USD";
    value: string;
  };
}

// items: [{
//     name: 'Enterprise Subscription',
//     quantity: '1',
//     category: 'DIGITAL_GOODS',
//     unit_amount: {
//         currency_code: 'EUR',
//         value: '9.99',
//     },
// }]
