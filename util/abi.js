const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_bytes32IpfsHash',
        type: 'bytes32',
      },
    ],
    name: 'FileRegistered',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: '_bytes32IpfsHash',
        type: 'bytes32',
      },
    ],
    name: 'registerFile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default ABI
