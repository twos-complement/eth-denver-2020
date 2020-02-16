import styled, { css } from 'styled-components'
import React, { useState, useEffect } from 'react'
import QR from 'qrcode'
import { Paper, Typography } from '@material-ui/core'

const QRPaper = styled(Paper)`
  ${({ theme: { dp, ...theme }, ...props }) => css`
    && {
      max-width: ${dp(340)};
      margin: auto;
    }
  `}
`

const QRImage = styled.img`
  ${({ theme: { dp, ...theme }, ...props }) => css`
    width: 100%;
  `}
`

const ProfileQRCode = ({ address }) => {
  const [src, setSrc] = useState()

  useEffect(() => {
    const profileUrl = `${window.origin}/profile/${address}`
    QR.toDataURL(profileUrl).then(setSrc)
  }, [])

  return <QRPaper>{src && <QRImage src={src} />}</QRPaper>
}

export default ProfileQRCode
