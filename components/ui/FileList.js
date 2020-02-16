import React from 'react'

const FileList = ({ fileList }) => (
  <div>
    {fileList.map(file => (
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

export default FileList
