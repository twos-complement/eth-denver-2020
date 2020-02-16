import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Web3 from 'web3'
import { Typography } from '@material-ui/core'

//TODO: pull out into withWeb3 hoc:
const web3 = new Web3(process.env.INFURA_ETH_GATEWAY)

const Wrapper = styled.div`
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.14);
  border-radius: 16px;
`

const Thumbnail = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`

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

  const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`

  return (
    <Wrapper>
      <Thumbnail src={ipfsUrl} />
      <Typography variant="h6">{file.title}</Typography>
      <p>✅ {timestamp && moment(timestamp * 1000).fromNow()}</p>
      <a href={`https://rinkeby.etherscan.io/tx/${file.txHash}`}>
        View on Etherescan
      </a>
    </Wrapper>
  )
}

export default FileCard
