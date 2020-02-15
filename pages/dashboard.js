import React from 'react'

import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import dynamic from 'next/dynamic'

const ProfileHover = dynamic(
  () => import('profile-hover'),
  { ssr: false }
)

import { Button } from '@material-ui/core';


const Dashboard = ({ auth: { account, logout }, box: { box } }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome! Your Fortmatic ETH address is: <strong>{account}</strong>, and
        your 3Box Box DID is: <strong>{box.DID}</strong>.
      </p>
    
      <ProfileHover address={account} />

      <Button color="primary" variant="contained" onClick={logout}>Logout</Button>
    </div>
  )
}

export default withAuth(withBox(Dashboard))
