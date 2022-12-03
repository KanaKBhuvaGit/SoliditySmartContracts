const { ethers } = require("ethers");

const INFURA_ID = 'b131b2e1515944d38693a4429a51cf8c'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const address = '0x8D5998A27b3CdF33479B65B18F075E20a7aa05b9'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()