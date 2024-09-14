const isDev = false
const isTestNet = false

export const providerUrl = isTestNet ? 'https://data-seed-prebsc-1-s1.bnbchain.org:8545' : 'https://rpc.ankr.com/eth'
export const chainId = isTestNet ? '0x61' : '0x1'
export const thlmContractAddress = isTestNet ? '0x803d58Ff1E4A07C9eEfcf9aa5E4a7Fd49e1EbdaE' :'0x0c1b0b010290509b79cAd5F6A669D7865947Be10' 
export const thlmContractAbi = [
    {
        "inputs":[],
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "anonymous":false,
        "inputs":
        [
            {
                "indexed":true,
                "internalType":"address",
                "name":"owner",
                "type":"address"
            },
            {
                "indexed":true,
                "internalType":"address",
                "name":"spender",
                "type":"address"
            },
            {
                "indexed":false,
                "internalType":"uint256",
                "name":"value",
                "type":"uint256"
            }
        ],
        "name":"Approval",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":true,
                "internalType":"address",
                "name":"from",
                "type":"address"
            },
            {
                "indexed":true,
                "internalType":"address",
                "name":"to",
                "type":"address"
            },
            {
                "indexed":false,
                "internalType":"uint256",
                "name":"value",
                "type":"uint256"
            }
        ],
        "name":"Transfer",
        "type":"event"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"owner",
                "type":"address"
            },
            {
                "internalType":"address",
                "name":"spender",
                "type":"address"
            }
        ],
        "name":"allowance",
        "outputs":[
            {
                "internalType":"uint256",
                "name":"",
                "type":"uint256"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"spender",
                "type":"address"
            },
            {
                "internalType":"uint256",
                "name":"amount",
                "type":"uint256"
            }
        ],
        "name":"approve",
        "outputs":[
            {
                "internalType":"bool",
                "name":"",
                "type":"bool"
            }
        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {"inputs":[
        {"internalType":"address","name":"account","type":"address"}
    ],
    "name":"balanceOf",
    "outputs":[
        {"internalType":"uint256","name":"","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
},{
    "inputs":[
        {"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name":"burn",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
},{
    "inputs":[
        {"internalType":"address","name":"account","type":"address"},
        {"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name":"burnFrom",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
},
{
    "inputs":[],
    "name":"decimals",
    "outputs":[
        {"internalType":"uint8","name":"","type":"uint8"}
    ],
    "stateMutability":"view",
    "type":"function"
},{
    "inputs":[
        {"internalType":"address","name":"spender","type":"address"},
        {"internalType":"uint256","name":"subtractedValue","type":"uint256"}
    ],
    "name":"decreaseAllowance",
    "outputs":[
        {"internalType":"bool","name":"","type":"bool"}
    ],
    "stateMutability":"nonpayable",
    "type":"function"
},
{
    "inputs":[
        {"internalType":"address","name":"spender","type":"address"},
        {"internalType":"uint256","name":"addedValue","type":"uint256"}
    ],
    "name":"increaseAllowance",
    "outputs":[
        {"internalType":"bool","name":"","type":"bool"}
    ],
    "stateMutability":"nonpayable",
    "type":"function"
},{
    "inputs":[],
    "name":"name",
    "outputs":[
        {"internalType":"string","name":"","type":"string"}
    ],
    "stateMutability":"view",
    "type":"function"
},{
    "inputs":[],
    "name":"symbol",
    "outputs":[
        {"internalType":"string","name":"","type":"string"}
    ],
    "stateMutability":"view",
    "type":"function"
},{
    "inputs":[],"name":"totalSupply",
    "outputs":[
        {"internalType":"uint256","name":"","type":"uint256"}
    ],
    "stateMutability":"view",
    "type":"function"
},{
    "inputs":[
        {"internalType":"address","name":"to","type":"address"},
        {"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name":"transfer",
    "outputs":[
        {"internalType":"bool","name":"","type":"bool"}
    ],
    "stateMutability":"nonpayable","type":"function"
},{
    "inputs":[
        {"internalType":"address","name":"from","type":"address"},
        {"internalType":"address","name":"to","type":"address"},
        {"internalType":"uint256","name":"amount","type":"uint256"}
    ],
    "name":"transferFrom",
    "outputs":[
        {"internalType":"bool","name":"","type":"bool"}
    ],
    "stateMutability":"nonpayable",
    "type":"function"
}]

export const stakeContractAddress = isTestNet ? '0xE9EE6275557eA68CB15833934C96b0D4df1abFa9' : '0x802e182e998c7e15462b3d453f27ac06ae7640c6'
export const stakeContractAbi =[
    {
        "inputs":[
                {"internalType":"address","name":"THMLTokenAddress_","type":"address"},
                {"internalType":"address","name":"daoAddress_","type":"address"}
            ],
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"stakeTime","type":"uint256"}
        ],
        "name":"LevelUpdated",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},
            {"indexed":true,"internalType":"address","name":"newOwner","type":"address"}
        ],
        "name":"OwnershipTransferred",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"account","type":"address"}
        ],
        "name":"Paused",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"user","type":"address"},
            {"indexed":false,"internalType":"uint256","name":"oldLevel","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newLevel","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"oldStakeAmount","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newStakeAmount","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"oldStakeTimestamp","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newStakeTimestamp","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"oldUnstakeTimestamp","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newUnstakeTimestamp","type":"uint256"}],
            "name":"ThlmStake",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {"indexed":false,"internalType":"address","name":"user","type":"address"},
                {"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},
                {"indexed":false,"internalType":"uint256","name":"unstatkeAmount","type":"uint256"},
                {"indexed":false,"internalType":"uint256","name":"userGetAmount","type":"uint256"},
                {"indexed":false,"internalType":"uint256","name":"unstakeTimestamp","type":"uint256"}
            ],
            "name":"ThlmUnstake",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {"indexed":false,"internalType":"address","name":"account","type":"address"}
            ],
            "name":"Unpaused",
            "type":"event"
        },
        {
            "inputs":[],
            "name":"THMLTokenAddress",
            "outputs":[
                {"internalType":"address","name":"","type":"address"}
            ],
            "stateMutability":"view",
            "type":"function"
        },{
            "inputs":[],
            "name":"daoAddress",
            "outputs":[
                {"internalType":"address","name":"","type":"address"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"deductionPercent",
            "outputs":[
                {"internalType":"uint256","name":"","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },{
            "inputs":[],
            "name":"emergencyUnstake",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },{
            "inputs":[],
            "name":"emergencyUnstakeFlag",
            "outputs":[
                {"internalType":"bool","name":"","type":"bool"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"uint256","name":"level","type":"uint256"}
            ],
            "name":"getStakeTime",
            "outputs":[
                {"internalType":"uint256","name":"","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"uint256","name":"stakeTime","type":"uint256"},
                {"internalType":"uint256","name":"level","type":"uint256"}
            ],
            "name":"getUnstakeTime",
            "outputs":[
                {"internalType":"uint256","name":"","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"address","name":"user","type":"address"}
            ],
            "name":"getUserStakeInfo",
            "outputs":[
                {"components":[
                    {"internalType":"uint256","name":"stakeLevel","type":"uint256"},
                    {"internalType":"uint256","name":"stakeAmount","type":"uint256"},
                    {"internalType":"uint256","name":"stakeTimestamp","type":"uint256"}
                ],
                "internalType":"struct THLMMember.StakeInfo","name":"","type":"tuple"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"owner",
            "outputs":[
                {"internalType":"address","name":"","type":"address"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"pause",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"},
            {"inputs":[],
            "name":"paused",
            "outputs":[
                {"internalType":"bool","name":"","type":"bool"}
            ],
            "stateMutability":"view",
            "type":"function"},
            {"inputs":[
                {"internalType":"address","name":"user","type":"address"}
            ],
            "name":"queryUnstake",
            "outputs":[
                {"internalType":"uint256","name":"userGetAmount","type":"uint256"},
                {"internalType":"uint256","name":"userLostAmount","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"renounceOwnership",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"uint256","name":"level","type":"uint256"},
                {"internalType":"uint256","name":"amount","type":"uint256"}
            ],
            "name":"stake",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },{
            "inputs":[
                {"internalType":"address","name":"newOwner","type":"address"}
            ],
            "name":"transferOwnership",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"unpause",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"unstake",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },{
            "inputs":[
                {"internalType":"address","name":"daoAddress_","type":"address"}
            ],
            "name":"updateDaoAddress",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"uint256","name":"percent","type":"uint256"}
            ],
            "name":"updateDeductionPercent",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },{
            "inputs":[
                {"internalType":"bool","name":"flag","type":"bool"}
            ],
            "name":"updateEmergeceUnstakeFlag",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },{
            "inputs":[
                {"internalType":"uint256","name":"level","type":"uint256"},
                {"internalType":"uint256","name":"time","type":"uint256"}
            ],
            "name":"updateStakeLevelInfo",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        }]

export const apiUrl = isDev ? 'http://103.119.106.13:15220/' : 'https://membership.thlm.bond/'
// export const apiUrl = isDev ? 'http://103.119.106.13:15220/' : 'http://103.119.106.13:15120/'
// export const apiUrl = isDev ? 'http://192.168.32.18:3320/' : 'http://103.119.106.13:15220/'

// 
export const productUrl = isDev ? "/Static/membership" : "/"