import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import ProfileQRCode from '../components/ui/ProfileQRCode'
import Link from 'next/link'

const ProfileHover = dynamic(() => import('profile-hover'), { ssr: false })

const Wrapper = styled.div`
  height: 100vh;
  background-color: white;
`

const SideBar = ({ account }) => {
  return (
    <Wrapper>
      <ProfileHover address={account} />
      <ProfileQRCode address={account} />
      <Link href={`/profile/${account}`}>
        <a>Link to your Public Profile</a>
      </Link>
    </Wrapper>
  )
}

export default SideBar
