import { useState } from 'react';
import Link from 'next/link';
import { getToken } from '../../utils/auth'

const BannerCard = ({ banner, handleEnabledChange}) => {
  const bannerScriptTag1 = `script src="http://localhost:3600/${banner._id}.js"`;
  const bannerScriptTag2 = "/script";
  return (
    <>
      <li>
        <div>
          <div className="uk-card uk-card-default uk-card-small" style={{boxShadow:'none', borderRadius:'0.1875rem'}}>
            <div className="uk-card-body">
              <h4 className="uk-margin-small-bottom uk-text-bold">{ banner.name }</h4>
              <span className="uk-text-small">
                 { banner.text }
              </span><br/>
            </div>
            <div className="uk-card-footer" style={{display:'flex', alignItems:'center'}}>
                <Link href="/banner/[bannerId]" as={`/banner/${banner._id}`}><a className="uk-button uk-button-default" style={{borderRadius:'0.1875rem'}}>Manage</a></Link>
                <div style={{display:'flex', marginLeft:'auto'}}>
                  <label className="uk-switch">
                    <input checked={banner.enabled} onChange={() => handleEnabledChange(banner._id)} type="checkbox"/>
                    <div className="uk-switch-slider"></div>
                  </label>
                  <span style={{marginLeft:'0.3rem'}}>Enabled</span>
                </div>
            </div>
          </div>
        </div>


      </li>
      <div id="script-tag-modal" data-uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body" style={{width:'700px',borderRadius:'0.1875rem'}}>
              <button className="uk-modal-close-default" type="button" uk-close="true"></button>
              <h2 className="uk-text-lead">Paste the script tag below in your websites HTML code.</h2>
              <p className="uk-text-small">This script tag will only work on the host specified in your banner settings.</p>
              <code>&lt;{bannerScriptTag1}&gt;&lt;{bannerScriptTag2}&gt;</code>
          </div>
      </div>
    </>
  )
}

export default BannerCard;
