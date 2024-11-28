const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Use lowercase 'http'
const address = "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6";

let abi =  
[
    {
        "inputs": [],
        "name": "certificate_hash",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decryption_key",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "hash_input",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "certi_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "block_hash",
                "type": "string"
            }
        ],
        "name": "input_hash",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "prompt_getter",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let scadd = '0x94e9bFAb0d6ce37e5C642435D8C80F5AE7465A2a'; 
let contract = new web3.eth.Contract(abi,scadd);


document.getElementById("estore").onclick = async function(){
    
    let certi_hash_input = document.querySelector("#ecertiinput").value;
    let block_hash_input = document.querySelector("#eblockinput").value;
    
    let block_data = await contract.methods.certificate_hash().call({from: "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6"});
    //let block = await web3.eth.getBlock(block_hash_input);
    let booly = await contract.methods.input_hash(certi_hash_input,block_data).send({from: "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6"});
    let booly_input = await contract.methods.input_hash(certi_hash_input,block_data).call();
    let verifi = document.querySelector("#verifi");
    
    if (booly_input){
        verifi.innerHTML = "Valid";
    }else{
        verifi.innerHTML = "Invalid";
    }
}
