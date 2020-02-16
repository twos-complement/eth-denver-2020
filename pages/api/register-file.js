import { getBytes32FromIpfsHash } from '../../util/hashMod'
import { web3, contract, GAS_PRICE } from '../../util/web3'

export default async (req, res) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]

  //TODO pull from request:
  const userAddress = '0x44109BA56b94B0d040f4FbFE0F01bbC492CB4A2D'
  const ipfsHash = 'QmdLEBQ5vL6jFUMgdD75K7He7p8fP8jQxMkSkWvpPbshiu'
  const bytes32IpfsHash = getBytes32FromIpfsHash(ipfsHash)

  //TODO have user sign arguments and verify signature here:

  //TODO verify IPFS hash hasn't already been registered before:

  let resp = await contract.methods
    .registerFile(userAddress, bytes32IpfsHash)
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
