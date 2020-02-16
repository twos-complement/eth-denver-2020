import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Fortmatic from 'fortmatic'
import Web3 from 'web3'

import { AuthContext } from '../../components/context'

function loadWeb3(fm) {
  return new Promise(async (resolve, reject) => {
    let fmProvider = fm.getProvider()
    let web3 = new Web3(fmProvider)

    resolve(web3)
  })
}

function loadAccount(web3) {
  return new Promise(async (resolve, reject) => {
    let accounts = await web3.currentProvider.enable()
    let mainAccount = accounts[0]
    resolve(mainAccount)
  })
}

export const AuthProvider = props => {
  const [web3, setWeb3] = useState()
  const [account, setAccount] = useState()
  const [fm, setFm] = useState()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
          setIsLoading(true);

          loadWeb3(fm)
            .then(web3Provider => new Promise(async (resolve, reject) => {
              setWeb3(web3Provider)
              resolve(web3Provider)
            }))
            .then(loadAccount)
            .then(setAccount)
            .finally(() => setIsLoading(false))
        },
        logout,
        isLoading,
        isLoggingOut,
        web3,
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
        if (!context.account && !context.isLoading) {
          // First time in, load account using fortmatic/web3:
          context.loadAccount()
          return <p>Loading Auth...</p>
        }
        else if (context.isLoading) {
          return <p>Loading Auth......</p>
        }
        else if (context.isLoggingOut) {
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
