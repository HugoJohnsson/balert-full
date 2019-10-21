import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logout, getToken } from '../../utils/auth';
import { getTrialPeriodDays } from '../../utils/user';

const Navbar = (props) => {
  const [daysLeftOfTrail, setDaysLeftOfTrail] = useState('');
  const handleLogout = () => logout();

  const bannerScriptTag1 = `script src="http://localhost:3600/.js"`;
  const bannerScriptTag2 = "/script";

  useEffect(() => {
    const token = getToken()
    setDaysLeftOfTrail(getTrialPeriodDays(token));
  })

  return (
    <header style={{backgroundColor:'#fff',borderBottom:'1px solid #f2f2f2'}}>
      <div className="uk-container">
        <nav id="navbar" data-uk-navbar="mode: click;">
          <div className="uk-navbar-left">
            <Link href='/dashboard'><img style={{cursor:'pointer'}} src="/assets/images/logo-2.png" width="120" alt=""/></Link>
            <span style={{marginLeft:'1rem'}} className="uk-text-warning uk-text-small">
              Your trial ends in <span className="uk-text-bold"> { daysLeftOfTrail }</span> days
            </span>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li><Link href="/install"><a>Setup</a></Link></li>
              <li>
                <a href="#" data-uk-icon="icon:user"></a>
                <div className="uk-navbar-dropdown uk-navbar-dropdown-bottom-left">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-nav-header uk-text-small uk-text-primary">YOUR ACCOUNT</li>
                    <li><Link href="/settings"><a><span data-uk-icon="icon: settings"></span> Settings</a></Link></li>
                    <li><Link href="/billing"><a href="#"><span data-uk-icon="icon: info"></span> Billing</a></Link></li>
                    <li className="uk-nav-divider"></li>
                    <li onClick={handleLogout} style={{cursor:'pointer'}}><span data-uk-icon="icon: sign-out"></span> Logout</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
