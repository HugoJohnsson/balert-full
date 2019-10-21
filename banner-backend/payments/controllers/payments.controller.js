const stripe = require('stripe')('sk_test_3mWPcPCw6ad7WuqW6C6xUHGI002LTSuZFC');
const endpointSecret = 'whsec_6slUU7yzeaIoHEuuHp26kceWRXmJqpmM';

const UserModel = require("../../users/models/users.model");
const { createCustomer, retrieveCustomer, createSubscription, cancelSubscription, addPaymentMethodToCustomer } = require('../../common/services/stripe.service');


exports.handleWebhooks = async (req, res) => {
  const invoive = req.body.data.object;
  const event = req.body.type;
  const customerId = data.object.customer;

  switch (event) {
    case 'invoice.payment_failed':
      const customer = await retrieveCustomer(customerId).catch(err => console.log(err));
      if (!customer) break;

      const subscriptions = customer.subscriptions.data;
      const subscription = subscriptions[0];

      const cardsCount = customer.sources.data.length;
      const now = new Date(invoice.created * 1000);
      const trialStart = new Date(subscription.created * 1000);

      const oneDay = 24 * 60 * 60 * 1000;
      const daysSince = Math.round(Math.abs((now - trialStart) / oneDay))

      if (daysSince == 7 && cardsCount < 1) {
        cancelSubscription(subscription.id)
        .then(res => {
          UserModel.patch(customer.email, { hasStartedPlan: false })
          .then(res => console.log(res))
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
      }

      res.status(200).send();
      break;
    case 'customer.subscription.trial_will_end':
      // SEND EMAIL TO CUSTOMER INFORMING THEM THAT THE TRIAL WILL END IN 3 DAYS
      break;
    default:
      console.log()
  }
};

exports.createSubscription = async (req, res) => {
  createCustomer(req.body.email, req.body.token)
  .then(async (customer) => {
    const customerId = customer.id;

    const subscription = await createSubscription(customerId, 'plan_Fzu6gcEuXiqwDA').catch(err => {
      res.status(500).send({ error: err });
    })


    const result = await UserModel.patchUser(req.params.userId, { stripeCustomerId: customerId, hasStartedPlan: true, currentPeriodEnds: subscription.trial_end }).catch(err => {
      res.status(500).send({ error: err });
    })

    res.status(200).send(subscription);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ error: err });
  });
};

exports.addPaymentMethod = async (req, res) => {
  const user = await UserModel.findById(req.body.userId);
  const customer = await retrieveCustomer(user.customerId);
  const token = req.body.token;

  addPaymentMethodToCustomer(customer.id, token)
  .then(customer => {
    UserModel.patchUser(user.id, { hasStartedPlan: true })
    .then(res => res.status(200).send({ result: customer}))
    .catch(err => res.status(500).send({ error: err }))
  })
  .catch(err => res.status(500).send({ error: err }))
}
