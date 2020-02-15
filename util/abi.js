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
        internalType: 'string',
        name: '_ipfsHash',
        type: 'string',
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
        internalType: 'string',
        name: '_ipfsHash',
        type: 'string',
      },
    ],
    name: 'registerFile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
export default ABI
