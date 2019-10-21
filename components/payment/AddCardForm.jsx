import React, {Component} from 'react';
import Router from 'next/router';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { store } from 'react-notifications-component';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = async (ev) => {
    let { token } = await this.props.stripe.createToken({});
    let response = await fetch(`/payments/${this.props.userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        token: token.id,
        email: this.props.userEmail
      })
    });

    if (response.ok) {
      store.addNotification({
          message: 'Your card was saved, thank you!',
          type: 'success',
          container: 'top-center',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4500,
          },
          width: 300
      });

      this.props.done();
    }
  }

  render() {
    return (
      <div className="checkout">
        <CardElement hidePostalCode={true} style={{base: {fontSize: '18px'}}}/>
        <button onClick={this.submit} className="uk-button uk-button-primary" style={{marginTop:'0.7rem', marginLeft: '0.3rem', borderRadius:'0.1875rem'}}>
          Add card
        </button>
        <button onClick={this.props.cancelAddCard} className="uk-button uk-button-danger" style={{marginTop:'0.7rem', marginLeft: '0.3rem', borderRadius:'0.1875rem'}}>
          Cancel
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
