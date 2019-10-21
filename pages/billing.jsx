import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Navbar from '../components/dashboard/Navbar';
import BannerCard from '../components/dashboard/BannerCard';
import fetch from 'isomorphic-unfetch'
import { store } from 'react-notifications-component';

import { withAuthSync, getToken, auth } from '../utils/auth';
import { getUserId, hasPaymentMethod } from '../utils/user';

import dynamic from 'next/dynamic'

const AddCard = dynamic(
  () => import('../components/payment/AddCard'),
  { ssr: false }
)

const Billing = (props) => {
  const [domain, setDomain] = useState(props.user.domain);
  const [showAddCard, setShowAddCard] = useState(false);
  const [user, setUser] = useState(props.user);

  const refetchUserData = async () => {
    const token = getToken();
    const userId = getUserId(token);
    const res = await fetch(`http://localhost:3600/users/${userId}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const user = await res.json();
    setUser(user);
    return
  }

  const renderContent = () => {
    if (!user.hasPayment) {
      if (!showAddCard) {
        return (
          <>
            <p>You don't have a payment method attached to your account.</p>
            <button onClick={() => setShowAddCard(true)} className="uk-button uk-button-primary" style={{borderRadius:'0.1875rem'}}>Add a card</button>
          </>
        )
      } else {
        return (
          <AddCard userId={user.id} userEmail={user.email} cancelAddCard={() => setShowAddCard(false)} done={refetchUserData}/>
        )
      }
    } else {
      return <h1>dkasdklsöa</h1>
    }
  }

  return (
    <Layout title="Billing">
      <Navbar/>
  		<section className="uk-section uk-section-muted" style={{height:'95vh'}}>
        <div className="uk-container">
  				<h2 className="uk-text-bold">Billing</h2>
          {
            renderContent()
          }
  			</div>
  		</section>
    </Layout>
  )
}

Billing.getInitialProps = async (ctx) => {
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

export default withAuthSync(Billing);
