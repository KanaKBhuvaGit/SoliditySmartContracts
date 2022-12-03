const { ethers } = require('ethers');

const INFURA_ID = 'b131b2e1515944d38693a4429a51cf8c';

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const address = '0x974CaA59e49682CdA0AD2bbe82983419A2ECC400';

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()