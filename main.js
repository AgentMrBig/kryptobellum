const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(attrs){
        this.index = attrs.index;
        this.timestamp = attrs.timestamp;
        this.data = attrs.data;
        this.previousHash = attrs.previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block({
            index: 0, 
            timestamp: "04/04/2019", 
            data: "Genesis block", 
            previousHash: "0"
        });
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash()){
                return false;
            }
        }
    }
}

let kryptobellum = new Blockchain();

kryptobellum.addBlock(new Block({
    index: 1, 
    timestamp: "10/07/2017", 
    data: { amount: 500}
}));

kryptobellum.addBlock(new Block({
    index: 2, 
    timestamp: "12/07/2017", 
    data: { amount: 24}
}));
    
console.log('Is blockchain valid? ' + kryptobellum.isChainValid());
//console.log(JSON.stringify(kryptobellum, null, 4));

