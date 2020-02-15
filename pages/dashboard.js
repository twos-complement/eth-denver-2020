import React from 'react'

import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'

const Dashboard = ({ auth: { account, logout }, box: { box } }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome! Your Fortmatic ETH address is: <strong>{account}</strong>, and
        your 3Box Box DID is: <strong>{box.DID}</strong>.
      </p>
      <div onClick={logout}>Logout</div>
    </div>
  )
}

export default withAuth(withBox(Dashboard))
