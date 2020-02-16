import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import Link from 'next/link'
import NavLayout from '../components/layouts/NavLayout'

import { Button } from '@material-ui/core'
import { Dropzone } from '../components/ui'

const Wrapper = styled.div`
  padding: 40px 80px 80px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.14);
  border-radius: 16px;
`

const UploadRegistrationPage = ({
  auth: { account, logout, web3 },
  box: { box, space },
}) => {
  const [uploadData, setUploadData] = useState()

  console.log(uploadData)

  return (
    <NavLayout logout={logout}>
      {!uploadData && (
        <Wrapper>
          <Dropzone
            web3={web3}
            account={account}
            space={space}
            onComplete={opts => {
              setUploadData(opts)
            }}
          />
        </Wrapper>
      )}
      {uploadData && <p>uploaded!!</p>}
    </NavLayout>
  )
}

export default withAuth(withBox(UploadRegistrationPage))
