import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import AddCardForm from './AddCardForm';

class SubscriptionForm extends Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({stripe: window.Stripe('pk_test_6Y3tu0dpJusXf80I4j3YLNzG0061VJkClE')});
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <div className="example">
          <Elements>
            <AddCardForm userId={this.props.userId} userEmail={this.props.userEmail} cancelAddCard={this.props.cancelAddCard} done={this.props.done}/>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default SubscriptionForm;
