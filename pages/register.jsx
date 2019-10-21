import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import { store } from 'react-notifications-component';

import fetch from 'isomorphic-unfetch'
import { login, redirectIfPaymentMethod, getToken, toDashboardIfLoggedIn } from '../utils/auth'
import { hasPaymentMethod } from '../utils/user';
import { validateEmail, validatePasswords } from '../utils/validate'

import dynamic from 'next/dynamic'

const SubscriptionForm = dynamic(
  () => import('../components/payment/SubscriptionForm'),
  { ssr: false }
)

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [domain, setDomain] = useState('');

  const [showSubscriptionStep, setShowSubscriptionStep] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePasswords(password, confirmPassword)) {

      const res = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          domain: domain
        })
      });

      const data = await res.json();
      if(!data.error) {
        setUserId(data.id);
        setShowSubscriptionStep(true);
      }
    } else {
      store.addNotification({
          title: 'Error',
          message: 'Email has already been used or password does not match',
          type: 'danger',                         // 'default', 'success', 'info', 'warning'
          container: 'top-center',                // where to position the notifications
          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
          dismiss: {
            duration: 4500,
          },
          width: 300
      });
    }
  }

  const router = useRouter();

  useEffect(() => {
    toDashboardIfLoggedIn();

    if (router.query.userId) {
      setUserId(router.query.userId);
      setShowSubscriptionStep(true);
    }
  })


  return (
    <Layout title="Register">
      <div className="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" style={{height:"100vh"}} uk-height-viewport="true">
      	<div className="uk-width-1-1">
      		<div className="uk-container">
      			<div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="true">
      				<div className="uk-width-1-1@m">
      					{
                  !showSubscriptionStep ?
                  <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body" style={{background:'inherit', boxShadow:'none'}}>
        						<h3 className="uk-card-title uk-text-center">Create an account</h3>
        						<form onSubmit={handleSubmit}>
        							<div className="uk-margin">
        								<div className="uk-inline uk-width-1-1">
        									<span className="uk-form-icon" uk-icon="icon: mail"></span>
        									<input value={email} onChange={e => setEmail(e.target.value)} className="uk-input" type="text" placeholder="Email address" style={{borderRadius:'0.1875rem'}}/>
        								</div>
        							</div>
        							<div className="uk-margin">
        								<div className="uk-inline uk-width-1-1">
        									<span className="uk-form-icon" uk-icon="icon: lock"></span>
        									<input value={password} onChange={e => setPassword(e.target.value)}  className="uk-input" type="password" placeholder="Password" style={{borderRadius:'0.1875rem'}}/>
        								</div>
        							</div>
                      <div className="uk-margin">
        								<div className="uk-inline uk-width-1-1">
        									<span className="uk-form-icon" uk-icon="icon: lock"></span>
        									<input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  className="uk-input" type="password" placeholder="Confirm password" style={{borderRadius:'0.1875rem'}}/>
        								</div>
        							</div>
                      <div className="uk-margin">
        								<div className="uk-inline uk-width-1-1">
        									<span className="uk-form-icon" uk-icon="icon: home"></span>
        									<input value={domain} onChange={e => setDomain(e.target.value)} className="uk-input" type="text" placeholder='Your domain name' style={{borderRadius:'0.1875rem'}}/>
        								</div>
                        <span className="uk-text-small uk-text-muted">* You can always change your domain under "settings".</span>
        							</div>
        							<div className="uk-margin">
                        <button type="submit" className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{borderRadius:'0.1875rem'}}>Continue</button>
        							</div>
        							<div className="uk-text-small uk-text-center">
        							  Already have an account? <Link href='/login'><a>Sign in here</a></Link>
        							</div>
        						</form>
        					</div>
                  :
                  <div
                    style={{background:'#fff', boxShadow:'none', display: 'flex', justifyContent: 'space-around', height: '600px', width: '100%'}}
                  >
                    <div style={{width: '100%', padding: '2rem'}}>
                      <img src="/assets/images/logo-2.png" alt=""/>
                      <h3 className="uk-text-lead uk-text-bold">
                        Welcome, just one more step!
                      </h3>
                        <p className="uk-text-normal">
                          We will not charge you before your trail runs out
                          and you can always cancel your account under settings.
                          If you choose to continue without payment method you will
                          need to add this in under "billing" before your trial runs out.
                        </p>
                      <div>
                        <SubscriptionForm userId={userId} userEmail={email}/>
                      </div>
                    </div>
        					</div>
                }
      				</div>
      			</div>
      		</div>
      	</div>
      </div>
    </Layout>
  )
};

export default Register;
