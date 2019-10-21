exports.ids = [1];
exports.modules = {

/***/ "./components/payment/AddCard.jsx":
/*!****************************************!*\
  !*** ./components/payment/AddCard.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_stripe_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-stripe-elements */ "react-stripe-elements");
/* harmony import */ var react_stripe_elements__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_stripe_elements__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AddCardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddCardForm */ "./components/payment/AddCardForm.jsx");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




class SubscriptionForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super();
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({
      stripe: window.Stripe('pk_test_6Y3tu0dpJusXf80I4j3YLNzG0061VJkClE')
    });
  }

  render() {
    return __jsx(react_stripe_elements__WEBPACK_IMPORTED_MODULE_1__["StripeProvider"], {
      stripe: this.state.stripe
    }, __jsx("div", {
      className: "example"
    }, __jsx(react_stripe_elements__WEBPACK_IMPORTED_MODULE_1__["Elements"], null, __jsx(_AddCardForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
      userId: this.props.userId,
      userEmail: this.props.userEmail,
      cancelAddCard: this.props.cancelAddCard,
      done: this.props.done
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SubscriptionForm);

/***/ }),

/***/ "./components/payment/AddCardForm.jsx":
/*!********************************************!*\
  !*** ./components/payment/AddCardForm.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_stripe_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-stripe-elements */ "react-stripe-elements");
/* harmony import */ var react_stripe_elements__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_stripe_elements__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-notifications-component */ "react-notifications-component");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_notifications_component__WEBPACK_IMPORTED_MODULE_5__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;





class CheckoutForm extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  constructor(props) {
    super(props);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "submit", async ev => {
      let {
        token
      } = await this.props.stripe.createToken({});
      let response = await fetch(`/payments/${this.props.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()({
          token: token.id,
          email: this.props.userEmail
        })
      });

      if (response.ok) {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_5__["store"].addNotification({
          message: 'Your card was saved, thank you!',
          type: 'success',
          container: 'top-center',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4500
          },
          width: 300
        });
        this.props.done();
      }
    });

    this.submit = this.submit.bind(this);
  }

  render() {
    return __jsx("div", {
      className: "checkout"
    }, __jsx(react_stripe_elements__WEBPACK_IMPORTED_MODULE_4__["CardElement"], {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: '18px'
        }
      }
    }), __jsx("button", {
      onClick: this.submit,
      className: "uk-button uk-button-primary",
      style: {
        marginTop: '0.7rem',
        marginLeft: '0.3rem',
        borderRadius: '0.1875rem'
      }
    }, "Add card"), __jsx("button", {
      onClick: this.props.cancelAddCard,
      className: "uk-button uk-button-danger",
      style: {
        marginTop: '0.7rem',
        marginLeft: '0.3rem',
        borderRadius: '0.1875rem'
      }
    }, "Cancel"));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_stripe_elements__WEBPACK_IMPORTED_MODULE_4__["injectStripe"])(CheckoutForm));

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "core-js/library/fn/json/stringify");

/***/ })

};;
//# sourceMappingURL=1.js.map