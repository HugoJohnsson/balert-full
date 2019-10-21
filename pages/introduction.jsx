import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Router from 'next/router'

import fetch from 'isomorphic-unfetch'
import { getToken, withAuthSync } from '../utils/auth'
import { getUserId } from '../utils/user'
import { validateEmail, validatePasswords } from '../utils/validate'

const Introduction = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleContinueToDashboard = async () => {
    const userId = getUserId(getToken());
    const res = await fetch(`/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        showIntroduction: false
      })
    });

    Router.push('/dashboard');
  };

  useEffect(() => {
    const token = getToken()
    const userId = getUserId(token);
    setToken(token);
    setUserId(userId);
  })

  const bannerScriptTag1 = `script src="http://localhost:3600/${userId}.js"`;
  const bannerScriptTag2 = "/script";
  return (
    <Layout title="How to use">
      <div className="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" style={{height:"100vh"}} uk-height-viewport="true">
      	<div className="uk-width-1-1">
      		<div className="uk-container">
      			<div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="true">
      				<div className="uk-width-1-1@m">
                  <div style={{background:'#fff', boxShadow:'none', height: '600px', width: '100%'}}>
                    <div style={{width: '90%', padding: '2rem'}}>
                      <img src="/assets/images/logo-2.png" alt=""/>
                      <h3 className="uk-text-lead uk-text-bold">Introduction</h3>
                      <p className="uk-text-normal">
                        Before you continue we want to make sure you get the right experience with our product, so here's how it works: <br/>
                      </p>
                      <p>
                        <b>1. </b>Make sure you have the right domain in your account settings, this is the domain you typed in when you registered.
                        This is important because the banners you create will only work on that domain. You can easily change it under "settings".
                      </p>
                      <p>
                        <b>2. </b>Add the script tag below to your website:<br/>
                        <code>&lt;{bannerScriptTag1}&gt;&lt;{bannerScriptTag2}&gt;</code>
                      </p>
                      <p>
                        <b>3. </b>Start designing your banners.<br/>
                      </p>
                      <button onClick={handleContinueToDashboard} className="uk-button uk-button-primary" style={{marginTop:'0.7rem', borderRadius:'0.1875rem', backgroundColor:'#3ecf8e'}}>
                        Go to dashboard
                      </button>
                    </div>
        					</div>
      				</div>
      			</div>
      		</div>
      	</div>
      </div>
    </Layout>
  )
};

export default withAuthSync(Introduction);
