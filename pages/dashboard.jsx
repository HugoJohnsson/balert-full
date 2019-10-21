import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Link from 'next/link';
import Navbar from '../components/dashboard/Navbar';
import BannerCard from '../components/dashboard/BannerCard';
import fetch from 'isomorphic-unfetch'
import { store } from 'react-notifications-component';

import { withAuthSync, getToken, auth } from '../utils/auth';
import { getUserId, hasPaymentMethod } from '../utils/user';

const Dashboard = (props) => {
  const [banners, setBanners] = useState([]);

  const handleEnabledChange = async (bannerId) => {
    const banner = banners.find(item => item._id === bannerId);
    const updateValue = !banner.enabled;
    if (!checkBanners(bannerId)) {
      const token = getToken();
      const res = await fetch(`http://localhost:3600/banners/${bannerId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          enabled: updateValue
        })
      });

      const data = await res.json();
      if (!data.error) {
        const updatedBanners = banners.map(item => {
          if (item._id === bannerId) {
            item.enabled = updateValue
          }
          return item;
        });
        setBanners(updatedBanners);
      }
    } else {
      store.addNotification({
          message: 'You have to disable any other banner before you can enable this one.',
          type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

  const checkBanners = (bannerId) => {
    let result = false;
    banners.map(item => {
      if (item.enabled && item._id !== bannerId) {
        result = true;
      }
      return item;
    })
    return result
  }

  useEffect(() => {
    setBanners(props.banners);
    const token = getToken()
    console.log(hasPaymentMethod(token))
  }, [])

  return (
    <Layout title="Dashboard">
      <Navbar/>
  		<section className="uk-section uk-section-muted" style={{height:'95vh'}}>
        <div className="uk-container">
  				<h2 className="uk-text-bold">My banners</h2>
          <p uk-margin="true">
            <Link href='/banner/create'><a className="uk-button uk-button-primary" style={{borderRadius:'0.1875rem'}}>New banner</a></Link>
          </p>

  						{
                banners.length > 0 ?
                <div>
        					<div className="uk-position-relative">
                  <div className="uk-slider-container">
      							<ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-grid-medium">
      							  {
                        banners.map((item, key) => {

                          return (
                            <BannerCard key={key} banner={item} id={item._id} handleEnabledChange={handleEnabledChange}/>
                          )
                        })
                      }
      							</ul>
      						</div>
                  <div className="uk-hidden@m uk-light">
      							<a className="uk-position-center-left uk-position-small" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
      							<a className="uk-position-center-right uk-position-small" href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>
      						</div>
      						<div className="uk-visible@m">
      							<a className="uk-position-center-left-out uk-position-small" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
      							<a className="uk-position-center-right-out uk-position-small" href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>
      						</div>
      					</div>
      				</div>
                :
                  <div></div>
              }

  			</div>
  		</section>
    </Layout>
  )
}

Dashboard.getInitialProps = async (ctx) => {
  const token = auth(ctx);
  const userId = getUserId(token);
  const res = await fetch(`http://localhost:3600/banners/user/${userId}`, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  const banners = await res.json();

  return { banners }
}

export default withAuthSync(Dashboard);
