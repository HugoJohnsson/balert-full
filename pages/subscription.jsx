import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Router from 'next/router'

import fetch from 'isomorphic-unfetch'
import { login, toDashboardIfLoggedIn } from '../utils/auth'
import { validateEmail, validatePasswords } from '../utils/validate'

const Subscription = () => {

  return (
    <Layout title="Register">
      <div className="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" style={{height:"100vh"}} uk-height-viewport="true">
      	<div className="uk-width-1-1">
      		<div className="uk-container">
      			<div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="true">
      				<div className="uk-width-1-1@m">
      					<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body" style={{background:'inherit', boxShadow:'none'}}>
      						<h3 className="uk-card-title uk-text-center">Add payment details</h3>

      					</div>
      				</div>
      			</div>
      		</div>
      	</div>
      </div>
    </Layout>
  )
};

export default Subscription;
