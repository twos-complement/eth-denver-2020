import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Fortmatic from 'fortmatic'
import Web3 from 'web3'

import { AuthContext } from '../../components/context'

function loadAccount(fm) {
  return new Promise(async (resolve, reject) => {
    let fmProvider = fm.getProvider()
    let web3 = new Web3(fmProvider)

    let accounts = await web3.currentProvider.enable()
    let mainAccount = accounts[0]
    resolve(mainAccount)
  })
}

export const AuthProvider = props => {
  const [account, setAccount] = useState()
  const [fm, setFm] = useState()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!fm && typeof window !== 'undefined') {
    if (!process.env.FORTMATIC_API_KEY) {
      throw new Error('Must set FORTMATIC_API_KEY environment variable!')
    }
    setFm(new Fortmatic(process.env.FORTMATIC_API_KEY))
  }

  async function logout() {
    fm.user.logout().then(() => {
      window.location.pathname = '/'
    })
    setIsLoggingOut(true)
  }

  return (
    <AuthContext.Provider
      value={{
        account,
        loadAccount: () => {
          loadAccount(fm).then(setAccount)
        },
        logout,
        isLoggingOut,
        fm,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const withAuth = Component => {
  const component = props => (
    <AuthContext.Consumer>
      {context => {
        if (!context.account) {
          // First time in, load account using fortmatic/web3:
          context.loadAccount()
          return <p>Loading Auth...</p>
        } else if (context.isLoggingOut) {
          // Currently logging out, show loader:
          return <p>Logging out...</p>
        }

        // User logged in and account resolved, render children:
        return <Component {...props} auth={context} />
      }}
    </AuthContext.Consumer>
  )

  // Disable SSR since rendering needs client Fortmatic/Web3/etc.:
  return dynamic(() => Promise.resolve(component), {
    ssr: false,
  })
}

export default withAuth
