const { expect } = require("chai");

describe("token Contract", function() {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("contracts/Token.sol:Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();        
    });

    describe("Deployment", function(){
        it("Should set the right owner", async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of token to the owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transaction", function(){
        it("Should transfer tokens between accounts and update the balances after transfer", async function(){
            await hardhatToken.transfer(addr1.address, 100);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
            expect(await hardhatToken.totalSupply() - addr1Balance).to.equal(9999900);

            await hardhatToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(9999900);
        });

        it("Should fail if sender does not have enough tokens", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });
});
