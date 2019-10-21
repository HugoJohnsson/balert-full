import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'
import { login, toDashboardIfLoggedIn } from '../utils/auth'
import { validateEmail, validatePassword } from '../utils/validate'

import { store } from 'react-notifications-component';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubscriptionLink, setShowSubscriptionLink] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      const res = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await res.json();
      console.log(data)
      if (!data.errors) {
        login(data.accessToken);
      } else {
        store.addNotification({
            message: data.errors[0],
            type: 'danger',
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 9000,
            },
            width: 400
        });

        if (data.errors[0] === 'You have not completed the signup process, you do not have a subscription.') {
          setUserId(data.userId);
          setShowSubscriptionLink(true);
        }
      }
    } else {

    }
  }

  const router = useRouter();

  useEffect(() => {
    toDashboardIfLoggedIn();
    router.prefetch('/dashboard')
  })

  return (
    <Layout title="Login">
      <div className="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" style={{height:"100vh"}} uk-height-viewport="true">
      	<div className="uk-width-1-1">
      		<div className="uk-container">
      			<div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="true">
      				<div className="uk-width-1-1@m">
      					<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body" style={{background:'inherit', boxShadow:'none'}}>
      						<h3 className="uk-card-title uk-text-center">Sign in</h3>
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
                      {
                        !showSubscriptionLink ?
                        <button type="submit" className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{borderRadius:'0.1875rem'}}>Login</button>
                        :
                        <Link href={{ pathname: '/register', query: { userId } }}><a className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{borderRadius:'0.1875rem'}}>Continue to payment</a></Link>
                      }
      							</div>
      							<div className="uk-text-small uk-text-center">
      								Not registered? <Link href='/register'><a>Create an account</a></Link>
      							</div>
      						</form>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>
      </div>
    </Layout>
  )
};

export default Login;
