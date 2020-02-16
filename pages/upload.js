import React from 'react'

import withBox from '../components/hoc/withBox'
import withAuth from '../components/hoc/withAuth'
import Link from 'next/link'

import { Button } from '@material-ui/core';
import { Dropzone } from '../components/ui';

const UploadRegistrationPage = ({ auth: { account, logout, web3 }, box: { box } }) => {
  return (
    <div>
      <h1>Upload a Document</h1>
      <p>
        Welcome! Upload a Business Registration document.
      </p>
    
      <Dropzone web3={web3} account={account} />
    </div>
  )
}

export default withAuth(withBox(UploadRegistrationPage))