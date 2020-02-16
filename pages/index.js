import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '@material-ui/core'

import FullPagePhoto from '../components/ui/FullPagePhoto'

const Wrapper = styled.div`
  padding: 40px 80px;
  max-width: 640px;
  max-height: 444px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.14);
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
`

const Home = () => {
  return (
    <FullPagePhoto>
      <Wrapper>
        <img src="/mycolorado-welcome-logo.png" />
        <Link href="/dashboard">
          <Button color="default" variant="contained">
            Login
          </Button>
        </Link>
      </Wrapper>
    </FullPagePhoto>
  )
}

export default Home
