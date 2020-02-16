import bs58 from 'bs58'

// Convert IPFS hashes down to 32 byte structure, and recompose:
// Thanks Stan!
// https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes
export function getBytes32FromIpfsHash(ipfsHash) {
  return (
    '0x' +
    bs58
      .decode(ipfsHash)
      .slice(2)
      .toString('hex')
  )
}

export function getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = '1220' + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}
