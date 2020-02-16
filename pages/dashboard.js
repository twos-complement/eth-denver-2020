import React from 'react'

import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import UserFileList from '../components/UserFileList'
import NavLayout from '../components/layouts/NavLayout'

const Dashboard = ({ auth: { account, logout }, box: { box, space } }) => {
  return (
    <NavLayout logout={logout} account={account}>
      <h1>Wallet</h1>

      <UserFileList
        fetchFiles={() => {
          return space.public.get('files')
        }}
      />
    </NavLayout>
  )
}

export default withAuth(withBox(Dashboard))
