import { getBytes32FromIpfsHash } from '../../util/hashMod'
import { web3, contract, GAS_PRICE } from '../../util/web3-server'

export default async (req, res) => {
  const adminAccounts = await web3.eth.getAccounts()
  const adminAccount = adminAccounts[0]
  const body = JSON.parse(req.body)
  const userAddress = body.account
  const ipfsHash = body.message.ipfsData.IpfsHash
  const bytes32IpfsHash = getBytes32FromIpfsHash(ipfsHash)

  // Verify user's signature:
  const signature = body.signature
  const message = JSON.stringify(body.message)
  const signedByAddress = web3.eth.accounts.recover(message, signature)
  if (userAddress !== signedByAddress)
    throw new Error('User address does not match signature validation!')

  //TODO verify IPFS hash hasn't already been registered before:

  let resp = await contract.methods
    .registerFile(userAddress, bytes32IpfsHash)
    .send({ from: adminAccount, gasPrice: GAS_PRICE })

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
