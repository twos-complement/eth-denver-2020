import styled, { css } from 'styled-components'
import React, { useState, useEffect } from 'react'
import QR from 'qrcode'
import { Paper, Typography } from '@material-ui/core'

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

  return <div>{src && <QRImage src={src} />}</div>
}

export default ProfileQRCode
