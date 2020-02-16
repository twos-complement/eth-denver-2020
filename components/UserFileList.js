import React, { useState, useEffect } from 'react'

import FileList from './ui/FileList'

const UserFileList = ({ fetchFiles }) => {
  const [fileList, setFileList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSpaceData() {
      const data = (await fetchFiles()) || []
      setFileList(data)
      setIsLoading(false)
    }
    loadSpaceData()
  }, [])

  if (isLoading) {
    return <p>Loading files...</p>
  }

  return <FileList fileList={fileList} />
}

export default UserFileList
