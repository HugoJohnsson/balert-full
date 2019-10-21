import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Navbar from '../components/dashboard/Navbar';
import BannerCard from '../components/dashboard/BannerCard';
import fetch from 'isomorphic-unfetch'
import { store } from 'react-notifications-component';

import { withAuthSync, getToken, auth } from '../utils/auth';
import { getUserId } from '../utils/user';

const Settings = ({ user }) => {
  const [domain, setDomain] = useState(user.domain);

  const handleDomainChange = async (e) => {
    e.preventDefault();
    const token = getToken();
    const res = await fetch(`http://localhost:3600/users/${user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        domain: domain
      })
    });

    const data = await res.json();
    if (!data.error) {
      alert('saved!')
    } else {
      alert('Something unexpected happened')
    }
  }

  return (
    <Layout title="Settings">
      <Navbar/>
  		<section className="uk-section uk-section-muted" style={{height:'95vh'}}>
        <div className="uk-container">
  				<h2 className="uk-text-bold">Settings</h2>
            <form onSubmit={handleDomainChange}>
              <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                  <span>Domain:</span>
                  <input value={domain} onChange={e => setDomain(e.target.value)} className="uk-input" type="text" placeholder="Email address" style={{borderRadius:'0.1875rem'}}/>
                </div>
                <button type="submit" className="uk-button uk-button-primary uk-button-small" style={{borderRadius:'0.1875rem', marginTop:'0.5rem', textTransform:'none'}}>Update</button>
              </div>
            </form>
  			</div>
  		</section>
    </Layout>
  )
}

Settings.getInitialProps = async (ctx) => {
  const token = auth(ctx);
  const userId = getUserId(token);
  const res = await fetch(`http://localhost:3600/users/${userId}`, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  const user = await res.json();

  return { user }
}

export default withAuthSync(Settings);
