/**
 * Web3 Util for API use only!
 *
 * (Client should use withAuth/withBox HOCs to inject Fortmatic/3Box providers).
 */
import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import ABI from './abi'

if (!process.env.INFURA_ETH_GATEWAY) {
  throw new Error('Must set INFURA_ETH_GATEWAY env var!')
}

if (!process.env.MNEMONIC) {
  throw new Error('Must set MNEMONIC env var!')
}

const CONTRACT_ADDRESS = '0xC2644CcdE52120B6ef9E8Da06bc186D1121d7d9b'
const INFURA_ETH_GATEWAY = process.env.INFURA_ETH_GATEWAY
const MNEMONIC = process.env.MNEMONIC
const HDWProvider = new HDWalletProvider(MNEMONIC, INFURA_ETH_GATEWAY)

export const GAS_PRICE = 10000000000 // 10gwei
export const web3 = new Web3(HDWProvider)
export const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
