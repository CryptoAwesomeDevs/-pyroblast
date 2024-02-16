export const OptionABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'feed',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
          {
            internalType: 'uint24[]',
            name: 'poolFees',
            type: 'uint24[]',
          },
          {
            internalType: 'address',
            name: 'tokenBid',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'addr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'permil',
                type: 'uint256',
              },
            ],
            internalType: 'struct FeeKeeper[]',
            name: 'feeKeepers',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'depositPeriod',
            type: 'uint256',
          },
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
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum BidType',
        name: 'outcome',
        type: 'uint8',
      },
    ],
    name: 'BetPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'FundsWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BLAST',
    outputs: [
      {
        internalType: 'contract IBlast',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'from',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'to',
        type: 'uint256',
      },
    ],
    name: 'batchBidInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
          {
            internalType: 'enum OptionStage',
            name: 'optionStage',
            type: 'uint8',
          },
          {
            internalType: 'enum OptionResult',
            name: 'result',
            type: 'uint8',
          },
          {
            internalType: 'enum BidType',
            name: 'bidType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'bidAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timeStamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimableAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'claimed',
            type: 'bool',
          },
        ],
        internalType: 'struct Bid[]',
        name: '_bids',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
        ],
        internalType: 'struct BidClaimRequest[]',
        name: 'request',
        type: 'tuple[]',
      },
    ],
    name: 'batchClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
        ],
        internalType: 'struct BidClaimRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentOptionInfo',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'enum OptionStage',
                name: 'optionStage',
                type: 'uint8',
              },
              {
                internalType: 'enum OptionResult',
                name: 'result',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'optionIndex',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'optionName',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'address[]',
                name: 'tokensOut',
                type: 'address[]',
              },
              {
                internalType: 'address',
                name: 'tokenBid',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'tokenBidName',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lockTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'closePrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'upBets',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'downBets',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'totalBets',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'resolved',
                type: 'bool',
              },
            ],
            internalType: 'struct Option',
            name: 'currentRound',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'enum OptionStage',
                name: 'optionStage',
                type: 'uint8',
              },
              {
                internalType: 'enum OptionResult',
                name: 'result',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'optionIndex',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'optionName',
                type: 'string',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'address[]',
                name: 'tokensOut',
                type: 'address[]',
              },
              {
                internalType: 'address',
                name: 'tokenBid',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'tokenBidName',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lockTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTs',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'closePrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'upBets',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'downBets',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'totalBets',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
              {
                internalType: 'bool',
                name: 'resolved',
                type: 'bool',
              },
            ],
            internalType: 'struct Option',
            name: 'prevRound',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'currentPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct CurrentOptionInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentOptionTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getAllBidInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
          {
            internalType: 'enum OptionStage',
            name: 'optionStage',
            type: 'uint8',
          },
          {
            internalType: 'enum OptionResult',
            name: 'result',
            type: 'uint8',
          },
          {
            internalType: 'enum BidType',
            name: 'bidType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'bidAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timeStamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimableAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'claimed',
            type: 'bool',
          },
        ],
        internalType: 'struct Bid[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'optionId',
        type: 'uint256',
      },
    ],
    name: 'getBidInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
          {
            internalType: 'enum OptionStage',
            name: 'optionStage',
            type: 'uint8',
          },
          {
            internalType: 'enum OptionResult',
            name: 'result',
            type: 'uint8',
          },
          {
            internalType: 'enum BidType',
            name: 'bidType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'bidAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timeStamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimableAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'claimed',
            type: 'bool',
          },
        ],
        internalType: 'struct Bid[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getCurrentBidInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'optionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bidId',
            type: 'uint256',
          },
          {
            internalType: 'enum OptionStage',
            name: 'optionStage',
            type: 'uint8',
          },
          {
            internalType: 'enum OptionResult',
            name: 'result',
            type: 'uint8',
          },
          {
            internalType: 'enum BidType',
            name: 'bidType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'bidAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timeStamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimableAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endPrice',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'claimed',
            type: 'bool',
          },
        ],
        internalType: 'struct Bid[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentOptionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getOptionInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'enum OptionStage',
            name: 'optionStage',
            type: 'uint8',
          },
          {
            internalType: 'enum OptionResult',
            name: 'result',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'optionIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'optionName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'tokenBid',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenBidName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTs',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lockTs',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTs',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'upBets',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'downBets',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalBets',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'decimals',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'resolved',
            type: 'bool',
          },
        ],
        internalType: 'struct Option',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isStarted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'optionsAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'optionsOf',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_bidAmount',
        type: 'uint256',
      },
      {
        internalType: 'enum BidType',
        name: '_bidType',
        type: 'uint8',
      },
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
    ],
    name: 'resolve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
    ],
    name: 'resolveEnd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256',
      },
    ],
    name: 'resolveStart',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newDepositPeriod',
        type: 'uint256',
      },
    ],
    name: 'setDepositPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256',
      },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'permil',
            type: 'uint256',
          },
        ],
        internalType: 'struct FeeKeeper[]',
        name: 'newFeeKeepers',
        type: 'tuple[]',
      },
    ],
    name: 'setFeeKeepers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newLockPeriod',
        type: 'uint256',
      },
    ],
    name: 'setLockPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newOptionName',
        type: 'string',
      },
    ],
    name: 'setOptionName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint24[]',
        name: 'newPoolFees',
        type: 'uint24[]',
      },
    ],
    name: 'setPoolFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IPriceFeedPyroBlast',
        name: 'newPyroBlastFeed',
        type: 'address',
      },
    ],
    name: 'setPyroBlastFeed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newStartTimestamp',
        type: 'uint256',
      },
    ],
    name: 'setStartTimestamp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'setTokenIn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'newTokensOut',
        type: 'address[]',
      },
    ],
    name: 'setTokensOut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'toggleOption',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
