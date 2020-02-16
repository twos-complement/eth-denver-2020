import React, { useState, useEffect } from 'react'

const FileList = ({ space }) => {
  const [fileList, setFileList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSpaceData() {
      const data = (await space.public.get('files')) || []
      setFileList(data)
      setIsLoading(false)
    }
    loadSpaceData()
  }, [])

  if (isLoading) {
    return <p>Loading files...</p>
  }

  console.log(fileList)

  return (
    <div>
      {fileList.length > 0 &&
        fileList.map(file => (
          <div key={file.txHash}>
            {file.txHash}
            <a href={`https://rinkeby.etherscan.io/tx/${file.txHash}`}>
              View TX on Etherescan
            </a>
            {file.ipfsHash}
            <a href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}>
              View on IPFS
            </a>
          </div>
        ))}
    </div>
  )
}

export default FileList
