const { ethers } = require("ethers");

const INFURA_ID = 'b131b2e1515944d38693a4429a51cf8c'
const provider = new ethers.providers.JsonRpcProvider(`HTTP://127.0.0.1:7545`)  //(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    //  const blockInfo = await provider.getBlock(block)

    //  console.log(blockInfo)

     const { transactions } = await provider.getBlockWithTransactions(block)

     console.log(`\nLogging first transaction in block:\n`)
     console.log(transactions[0])
}

main()