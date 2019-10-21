import Link from 'next/link';
import { logout } from '../../utils/auth';

const Navbar = () => {

  return (
    <header id="header-section">
      <nav class="navbar navbar-expand-lg pl-3 pl-sm-0" id="navbar">
      <div class="container">
        <div class="navbar-brand-wrapper d-flex w-100" style={{alignItems:'center'}}>
          <img id="logo-1" src="/assets/images/logo.png" width="150" alt=""/>
          <img id="logo-2" src="/assets/images/logo-2.png" width="120" alt="" style={{display:'none'}}/>
          <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="mdi mdi-menu navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse navbar-menu-wrapper" id="navbarSupportedContent" style={{zIndex:'10000'}}>
          <ul class="navbar-nav align-items-lg-center align-items-start ml-auto">
            <li class="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
              <div class="navbar-collapse-logo">
                <img src="/assets/images/logo-2.png" alt=""/>
              </div>
              <button style={{paddingLeft:'5rem'}} class="navbar-toggler close-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="mdi mdi-close navbar-toggler-icon pl-3"></span>
              </button>
            </li>
            <li class="nav-item btn-contact-us pl-4 pl-lg-0">
              <a class="nav-link" href="/login">Sign in</a>
              <a class="btn btn-info" href="/register">Start free trail</a>
            </li>
          </ul>
        </div>
      </div>
      </nav>
    </header>
  )
}

export default Navbar;
