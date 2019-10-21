const stripe = require('stripe')('sk_test_3mWPcPCw6ad7WuqW6C6xUHGI002LTSuZFC');
const endpointSecret = 'whsec_6slUU7yzeaIoHEuuHp26kceWRXmJqpmM';

// create customer (with or without a payment method)
exports.createCustomer = (customerEmail, token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      stripe.customers.create({
        email: customerEmail,
        source: token,
        },
        function(err, customer) {
          if (err) reject(err);
          else resolve(customer);
      });
    } else {
      stripe.customers.create({
        email: customerEmail,
        },
        function(err, customer) {
          if (err) {
            console.log(err)
            reject(err);
          } else resolve(customer);
      });
    }
  })
}

exports.retrieveCustomer = (customerId) => {
  return new Promise((resolve, reject) => {
    stripe.customers.retrieve(
      customerId,
      function(err, customer) {
        if (err) reject(err);
        else resolve(customer);
      }
    );
  })
}

exports.hasPaymentMethod = async (customerId) => {
  const customer = await exports.retrieveCustomer(customerId);
  if (!customer.default_source) return false;
  else return true;
}

exports.createSubscription = (customerId, planId) => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: planId,
        },
      ],
      trial_from_plan: true,
      expand: ['latest_invoice.payment_intent'],
    }, function(err, subscription) {
        if (err) reject(err);
        else resolve(subscription);
      }
    );
  })
}

exports.cancelSubscription = (subscriptionId) => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.del(
      subscriptionId,
      function(err, confirmation) {
        if (err) reject(err);
        else resolve(confirmation);
      }
    );
  })
}

exports.addPaymentMethodToCustomer = (customerId, token) => {
  return new Promise((resolve, reject) => {
    stripe.customers.update(
      customerId,
      {
        source: token
      },
      function(err, customer) {
        if (err) reject(err);
        else resolve(customer);
      }
    );
  })
}
