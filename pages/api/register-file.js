import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import ABI from '../../util/abi'

if (!process.env.INFURA_ETH_GATEWAY) {
  throw new Error('Must set INFURA_ETH_GATEWAY env var!')
}

if (!process.env.MNEMONIC) {
  throw new Error('Must set MNEMONIC env var!')
}

const GAS_PRICE = 10000000000 // 10gwei
const CONTRACT_ADDRESS = '0xF0a613DdF6044562284202a8671cb30566Df1155'
const INFURA_ETH_GATEWAY = process.env.INFURA_ETH_GATEWAY
const MNEMONIC = process.env.MNEMONIC

const HDWProvider = new HDWalletProvider(MNEMONIC, INFURA_ETH_GATEWAY)
const web3 = new Web3(HDWProvider)
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

export default async (req, res) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]

  //TODO pull from request:
  const userAddress = '0x44109BA56b94B0d040f4FbFE0F01bbC492CB4A2D'
  const ipfsHash = 'testipfshash'

  //TODO have user sign arguments and verify signature here:

  //TODO verify IPFS hash hasn't already been registered before:

  let resp = await contract.methods
    .registerFile(userAddress, ipfsHash)
    .send({ from: account, gasPrice: GAS_PRICE })

  console.log(
    `Transaction submitted, using ${resp.gasUsed} gas, at block number ${resp.blockNumber}.`,
  )

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      txHash: resp.transactionHash,
    }),
  )
}
