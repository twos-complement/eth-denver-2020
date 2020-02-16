import React from 'react'
import { useRouter } from 'next/router'
import Box from '3box'
import UserFileList from '../../components/UserFileList'

const Profile = () => {
  const router = useRouter()
  const { address } = router.query

  if (!address) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Profile {address}</h1>
      <UserFileList
        fetchFiles={async () => {
          const space = await Box.getSpace(address, process.env.SPACE_NAME)
          return space.files
        }}
      />
    </div>
  )
}

export default Profile
