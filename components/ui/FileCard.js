import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

//TODO: pull out into withWeb3 hoc:
const web3 = new Web3(process.env.INFURA_ETH_GATEWAY)

const FileCard = ({ file }) => {
  const [timestamp, setTimestamp] = useState()

  useEffect(() => {
    async function fetchTransaction() {
      const tx = await web3.eth.getTransaction(file.txHash)
      const block = await web3.eth.getBlock(tx.blockNumber)
      setTimestamp(block.timestamp)
    }
    fetchTransaction()
  }, [])

  return (
    <div>
      {timestamp} - {file.title}
      <a href={`https://rinkeby.etherscan.io/tx/${file.txHash}`}>
        View TX on Etherescan
      </a>
      {file.ipfsHash}
      <a href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}>
        View on IPFS
      </a>
    </div>
  )
}

export default FileCard
