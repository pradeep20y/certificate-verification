


// Import Web3 using ES6 module syntax
 // import Web3 from "../web3";  
 //web3 = new Web3(web3.currentProvider);

// Ethereum address for which you want to retrieve the balance
/* const address = "0xf7b0eb78abA9b2cDD9E8ebF14684f7b94c71ee67";

// Define the ABI and contract address
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "hashinput",
                "type": "string"
            }
        ],
        "name": "hash_input",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
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
    },
    {
        "inputs": [],
        "name": "x",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = '0x3c7b88Bd42fd49D7b21D7A51Bcd1EE2FEa6EC95B';

// Initialize a Web3 instance and connect to your local Ethereum node (Ganache)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Create an instance of your contract
const contract = new web3.eth.Contract(contractAbi, contractAddress);
  */
/* // Add a click event listener to the "store" button
document.getElementById("store").onclick = function () {
    // Get the input value from the input field
    let certificate_hash_from_web = document.querySelector("#certiinput").value;
    
    // Call the contract's "hash_input" method
    contract.methods.hash_input(certificate_hash_from_web)
        .send({ from: "0x9c0d0ae94a0e1F79C4808aE4Cf4f440531D7Da14" })
        .then(receipt => {
            console.log("Transaction receipt:", receipt);
            let output = document.querySelector("#output");
            output.innerHTML = "Transaction successful!";
        })
        .catch(error => {
            console.error("Transaction error:", error);
        });
};  */
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Use lowercase 'http'
const address = "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6";

let abi =  
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hashinput",
				"type": "string"
			}
		],
		"name": "hash_input",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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

let certificate_hash_from_web ="";
let decrypt_key = "";


let cid = "";
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjcxMWJjZi0yYWNhLTQzNWYtYWEzNi1lNzQ2MGExNGE2NTkiLCJlbWFpbCI6ImJsb2NrcmVwcmFkZWVwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5M2RkMzg3OGQyYTAyYTk5NmYwOSIsInNjb3BlZEtleVNlY3JldCI6IjhlY2I0ZDZhODIxODFmODU0N2UyYzY0OGUwYjFjMzEyMTExNDg5YzUzNmY5ZWU3ZGM1MmRkMjU2YjJkYWNhN2YiLCJpYXQiOjE2OTYyNDkyMDB9.cn3o-ZnDpiTXTvlC3owAjjyrTOdYvETCizBNi9pXi5M"; // Replace with your Pinata JWT token

const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const statusMessage = document.getElementById('status');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];

    if (!file) {
        statusMessage.textContent = 'Please   file.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`,
            },
        });
        cid = res.data.IpfsHash;
        statusMessage.textContent = `File uploaded to IPFS. CID : ${res.data.IpfsHash}`;
    } catch (error) {
        statusMessage.textContent = `Error uploading to Pinata: ${error.message}`;
    }
});

document.getElementById("store").onclick = async function() {
    try {
        // Call the 'x' function from your smart contract
		//certificate_hash_from_web = document.querySelector("#certiinput").value;
        //decrypt_key = document.querySelector("#decryptinp").value;
		//window.alert(decrypt_key);
		//certificate_hash_from_web = String(certificate_hash_from_web);
		
        //if (certificate_hash_from_web != "" && decrypt_key!=""){
        await contract.methods.hash_input(cid).send({from: "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6",gas: "6721975" });
        const result = await contract.methods.prompt_getter().call();
        let output1 = document.querySelector("#output");
        output1.innerHTML = `Status: ${result}`;
        //}
       // else{
         //   output.innerHTML = 'Please enter a valid hash';
        //}
        // Update the DOM element with the result
        //let output = document.querySelector("#output");
        //output.innerHTML = `Status: ${result}`;


        const blockNumber = await web3.eth.getBlockNumber();

        // Get the block information using the block number
        const block = await web3.eth.getBlock(blockNumber);
		console.log(block);

        // Access the block hash from the block object
        const blockHash = block.hash;

        // Update the DOM element with the block hash
        let output2 = document.querySelector("#outputhash");
        output2.innerHTML = `Block Hash: ${blockHash}`;




    } catch (error) {
        console.error("Error calling smart contract function:", error);
    }
};











  //const { Web3 } = require('web3');
/* const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Use lowercase 'http'
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
                "name": "hashinput",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "decrypkey",
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
];  */

/* let abi = [
 {
		"inputs": [
			{
				"internalType": "string",
				"name": "hashinput",
				"type": "string"
			}
		],
		"name": "hash_input",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}  
  ]; */
/* let scadd = '0xf930724832ad4F015ba6622CB71b7D8049F4E893'; 
let contract = new web3.eth.Contract(abi,scadd); */



// ******   storage    *********//
//let certificate_hash_from_web ="";
//let decrypt_key = "";
/* document.getElementById("store").onclick = async function() {
    try {
        // Call the 'x' function from your smart contract
		//certificate_hash_from_web = document.querySelector("#certiinput").value;
        //decrypt_key = document.querySelector("#decryptinp").value;
		//window.alert(decrypt_key);
		//certificate_hash_from_web = String(certificate_hash_from_web);
		
        //if (certificate_hash_from_web != "" && decrypt_key!=""){
        await contract.methods.hash_input(certificate_hash_from_web,decrypt_key).send({from: "0x7EAbf516aCE33d5E1E7D4b0579BFF35391170CF6",gas: "6721975" });
        const result = await contract.methods.prompt_getter().call();
        let output = document.querySelector("#output");
        output.innerHTML = `Status: ${result}`;
        //}
       // else{
         //   output.innerHTML = 'Please enter a valid hash';
        //}
        // Update the DOM element with the result
        //let output = document.querySelector("#output");
        //output.innerHTML = `Status: ${result}`;
    } catch (error) {
        console.error("Error calling smart contract function:", error);
    }
}; */

// Assuming you already have a 'web3' instance set up

// ***********getblock hash ******************\
/*
document.getElementById("getBlockHash").onclick = async function() {
    try {


		
        // Get the latest block number (you can specify a block number or block hash)
        if (certificate_hash_from_web != "" && decrypt_key!=""){
        const blockNumber = await web3.eth.getBlockNumber();

        // Get the block information using the block number
        const block = await web3.eth.getBlock(blockNumber);
		console.log(block);

        // Access the block hash from the block object
        const blockHash = block.hash;

        // Update the DOM element with the block hash
        let output = document.querySelector("#outputhash");
        output.innerHTML = `Block Hash: ${blockHash}`;
        }
    } catch (error) {
        console.error("Error getting block hash:", error);
    }
};
*/

// ******   verification    *********//

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



//****************
/* document.getElementById("store").onclick = function(){
	 
	//let certificate_hash_from_web = document.querySelector("#certiinput");
	//contract.methods.hash_input(certificate_hash_from_web).send({from: "0x9c0d0ae94a0e1F79C4808aE4Cf4f440531D7Da14"}); 
	contract.methods.x().call().then(console.log);
	let input = document.querySelector('#certiinput');
	let output = document.querySelector("#output");
	output.innerHTML = "hi";
   

}
 */






//*********** */ to get the balance from the ethereum account **********//
/* let balanceamt;
web3.eth.getBalance(address).then(balance => {
balanceamt = web3.utils.fromWei(balance, 'ether');
//console.log(balanceamt);
display();
}); 
 
function display(){
	console.log(balanceamt);
}*/
 
                              
	//************** */ accessing smart contract ***********//
    //let contract = new web3.eth.Contract(abi,add);
    //contract.methods.hash_input(certificate_hash_from_web).send({from: "0x9c0d0ae94a0e1F79C4808aE4Cf4f440531D7Da14"});
	//contract.methods.certificate_hash().call().then(console.log); 
       
	