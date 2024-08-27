export const stakeAbi = [
    {
        "inputs":[
            {"internalType":"address","name":"ownerAddress","type":"address"},
            {"internalType":"address","name":"THMLTokenAddress_","type":"address"}],
       "stateMutability":"nonpayable","type":"constructor"
    },
    {
        "inputs":[
            {"internalType":"address","name":"owner","type":"address"}],
            "name":"OwnableInvalidOwner","type":"error"
    },
    {
        "inputs":[
            {"internalType":"address","name":"account","type":"address"}],
            "name":"OwnableUnauthorizedAccount","type":"error"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},
            {"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],
        "name":"OwnershipTransferred","type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"account","type":"address"}],
            "name":"Paused","type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"user","type":"address"},
            {"indexed":false,"internalType":"uint256","name":"oldStakeAmount","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newStakeAmount","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"oldUnstakeTimestamp","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"newUnstakeTimestamp","type":"uint256"}],
            "name":"ThlmStake","type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"user","type":"address"},
            {"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},
            {"indexed":false,"internalType":"uint256","name":"unstakeTimestamp","type":"uint256"}],
            "name":"ThlmUnstake","type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {"indexed":false,"internalType":"address","name":"account","type":"address"}],
            "name":"Unpaused","type":"event"
    },
    {
        "inputs":[],
        "name":"THMLTokenAddress",
        "outputs":[
            {"internalType":"address","name":"","type":"address"}],
        "stateMutability":"view","type":"function"
    },
    {
        "inputs":[],
        "name":"emergencyUnstake",
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[],
        "name":"emergencyUnstakeFlag",
        "outputs":[
            {"internalType":"bool","name":"","type":"bool"}],
        "stateMutability":"view","type":"function"
    },
    {
        "inputs":[
            {"internalType":"address","name":"user","type":"address"}],
        "name":"getUserStakeInfo",
        "outputs":[
            {"components":[
                {"internalType":"uint256","name":"stakeAmount","type":"uint256"},
                {"internalType":"uint256","name":"unstakeTimestamp","type":"uint256"}
            ],
                "internalType":"struct THLMAirdrop.StakeInfo","name":"","type":"tuple"}],
                "stateMutability":"view","type":"function"
            },
    {
        "inputs":[],
        "name":"owner",
        "outputs":[
            {"internalType":"address","name":"","type":"address"}],
            "stateMutability":"view","type":"function"
        },
    {
        "inputs":[],
        "name":"pause",
        "outputs":[],
        "stateMutability":"nonpayable","type":"function"
    },
    {
        "inputs":[],
        "name":"paused",
        "outputs":[
            {"internalType":"bool","name":"","type":"bool"}],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {"internalType":"address","name":"user","type":"address"}],
        "name":"queryUnstake",
        "outputs":[
            {"internalType":"uint256","name":"userAmount","type":"uint256"},
            {"internalType":"uint256","name":"unstakeTimestamp","type":"uint256"}],
        "stateMutability":"view","type":"function"
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
            {"internalType":"uint256","name":"amount","type":"uint256"}],
         "name":"stake",
         "outputs":[],
         "stateMutability":"nonpayable",
         "type":"function"
    },
    {
        "inputs":[
            {"internalType":"address","name":"newOwner","type":"address"}],
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
    },
    {
        "inputs":[
            {"internalType":"bool","name":"flag","type":"bool"}],
        "name":"updateEmergeceUnstakeFlag",
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
    }]

 