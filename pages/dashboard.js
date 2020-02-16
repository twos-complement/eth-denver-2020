import React from 'react'

import styled, { css } from 'styled-components'
import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import UserFileList from '../components/UserFileList'
import ProfileQRCode from '../components/ui/ProfileQRCode'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import NavLayout from '../components/layouts/NavLayout'

const ProfileHover = dynamic(() => import('profile-hover'), { ssr: false })

import { Button } from '@material-ui/core'

const UploadSection = styled.div`
  ${({ theme: { bp, dp, ...theme }, ...props }) => css`
    margin-top: ${dp(60)};
  `}
`

const Dashboard = ({ auth: { account, logout }, box: { box, space } }) => {
  return (
    <NavLayout logout={logout}>
      <h1>Dashboard</h1>
      <p>
        Welcome! Your Fortmatic ETH address is: <strong>{account}</strong>, and
        your 3Box Box DID is: <strong>{box.DID}</strong>.
      </p>

      <ProfileHover address={account} />

      <UserFileList
        fetchFiles={() => {
          return space.public.get('files')
        }}
      />

      <UploadSection>
        <Link href="/upload">
          <Button variant="contained" size="medium" color="secondary">
            Upload a Registration
          </Button>
        </Link>
      </UploadSection>

      <ProfileQRCode address={account} />
      <Link href={`/profile/${account}`}>
        <a>Link to your Public Profile</a>
      </Link>
    </NavLayout>
  )
}

export default withAuth(withBox(Dashboard))
