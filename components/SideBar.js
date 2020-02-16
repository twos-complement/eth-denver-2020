import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import ProfileQRCode from '../components/ui/ProfileQRCode'
import Link from 'next/link'

const ProfileHover = dynamic(() => import('profile-hover'), { ssr: false })

const Wrapper = styled.div`
  height: 100vh;
  background-color: white;
  text-align: center;
`

const ProfileWrapper = styled.div`
  padding: 25px 50px 50px;
`

const SideBar = ({ account }) => {
  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileHover
          address={account}
          orientation="left"
          showName={true}
          tileStyle={true}
        />
      </ProfileWrapper>

      <ProfileQRCode address={account} />
      <Link href={`/profile/${account}`}>
        <a>Link to your Public Profile</a>
      </Link>
    </Wrapper>
  )
}

export default SideBar
