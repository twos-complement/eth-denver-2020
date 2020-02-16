import React from 'react'
import styled from 'styled-components'

import Nav from '../Nav'
import SideBar from '../SideBar'

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;

  > :first-child {
    padding: 50px 50px 50px 300px;
  }
`

const NavLayout = ({ children, logout }) => {
  return (
    <div>
      <Nav logout={logout} />
      <Content>
        <div>{children}</div>
        <SideBar />
      </Content>
    </div>
  )
}

export default NavLayout
