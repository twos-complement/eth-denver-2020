import {
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32,
} from '../../util/hashMod'
import { contract } from '../../util/web3-server'

export default async (req, res) => {
  // TODO: pass search filter from arguments:
  let events = await contract.getPastEvents('FileRegistered', {
    filter: {
      _bytes32IpfsHash: getBytes32FromIpfsHash(
        'QmdLEBQ5vL6jFUMgdD75K7He7p8fP8jQxMkSkWvpPbshiu',
      ),
    },
    fromBlock: 0,
    to: 'latest',
  })

  //TODO: throw error/warning if more than one unique hash event exists:
  // (for now, just grab the first one)
  const event = events[0]

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash,
      userAddress: event.returnValues._from,
      ipfsHash: getIpfsHashFromBytes32(event.returnValues._bytes32IpfsHash),
    }),
  )
}
