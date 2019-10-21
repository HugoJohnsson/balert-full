import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Navbar from '../components/dashboard/Navbar';
import BannerCard from '../components/dashboard/BannerCard';
import fetch from 'isomorphic-unfetch'
import { store } from 'react-notifications-component';

import { withAuthSync, getToken, auth } from '../utils/auth';
import { getUserId, shouldShowIntroduction } from '../utils/user';

const Install = (props) => {

  const userId = getUserId(getToken());
  const bannerScriptTag1 = `script src="http://localhost:3600/${userId}.js"`;
  const bannerScriptTag2 = "/script";
  return (
    <Layout title="Install">
      <Navbar/>
  		<section className="uk-section uk-section-muted" style={{height:'95vh'}}>
        <div className="uk-container">
  				<h2 className="uk-text-bold">How does it work?</h2>
          <h3 class="uk-card-title">1. Add the script tag below to your website:</h3>
          <code>&lt;{bannerScriptTag1}&gt;&lt;{bannerScriptTag2}&gt;</code>
          <h3 class="uk-card-title">2. Start designing your banners.</h3>
          <p className="uk-text-">
            Just make sure you have the right domain in your settings.
          </p>
          <Link href="/banner/create"><a class="uk-button uk-button-primary">Create a banner</a></Link>
  			</div>
  		</section>
    </Layout>
  )
}

export default withAuthSync(Install);
