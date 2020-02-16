import React, { useState, useEffect } from 'react'
import QR from 'qrcode'

const ProfileQRCode = ({ address }) => {
  const [src, setSrc] = useState()

  useEffect(() => {
    const profileUrl = `${window.origin}/profile/${address}`
    QR.toDataURL(profileUrl).then(setSrc)
  }, [])

  return (
    <div>
      <p>Your Public Profile QR Code:</p>
      {src && <img src={src} />}
    </div>
  )
}

export default ProfileQRCode
