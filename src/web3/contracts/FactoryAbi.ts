export const FactoryABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'feed',
            type: 'address',
          },
          { internalType: 'string', name: 'name', type: 'string' },
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          { internalType: 'address[]', name: 'tokensOut', type: 'address[]' },
          {
            internalType: 'uint24[]',
            name: 'poolFees',
            type: 'uint24[]',
          },
          { internalType: 'address', name: 'tokenBid', type: 'address' },
          {
            internalType: 'address',
            name: 'feeKeeper',
            type: 'address',
          },
          { internalType: 'uint256', name: 'fee', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'startTimestamp',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'depositPeriod', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'lockPeriod',
            type: 'uint256',
          },
        ],
        internalType: 'struct CreateOptionParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'createOption',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'deleteOption',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'from', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'to',
        type: 'uint256',
      },
    ],
    name: 'listOptions',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              { internalType: 'address', name: 'optionAddress', type: 'address' },
              {
                internalType: 'string',
                name: 'optionName',
                type: 'string',
              },
              { internalType: 'bool', name: 'initialized', type: 'bool' },
            ],
            internalType: 'struct FactoryAPED.Option[]',
            name: 'options',
            type: 'tuple[]',
          },
          { internalType: 'uint256', name: 'optionCount', type: 'uint256' },
        ],
        internalType: 'struct FactoryAPED.ListOptionResponse',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'optionCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
