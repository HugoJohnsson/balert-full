import { useEffect } from 'react';
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { shouldShowIntroduction, hasPaymentMethod } from './user';

export const toDashboardIfLoggedIn = () => {
  const token = getToken();

  if (token) {
    Router.push('/dashboard');
  }
}

export const isLoggedIn = () => {
  const token = getToken();

  if (token) {
    return true;
  } else {
    return false;
  }
}

export const getToken = () => {
  let token = null;
  if (typeof document !== 'undefined') {
    token = cookie.get('token')
  }
  return token
}

export const login = (token) => {
  cookie.set('token', token, { expires: 1 })
  console.log(shouldShowIntroduction(token))
  if (shouldShowIntroduction(token)) {
    Router.push('/introduction');
  } else {
    Router.push('/dashboard');
  }
}

export const logout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/login')
  }

  return token
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [null])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}
