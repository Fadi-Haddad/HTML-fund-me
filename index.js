import { ethers } from "./ethers-5.2.esm.min.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

import { abi, contractAddress } from "./constants.js";

connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  window.ethereum
    ? await window.ethereum.request({ method: "eth_requestAccounts" })
    : alert("Metamask not installed!!");
}
async function fund() {
  const sentAmount = "1";
  // we will need provider // connection to the blockchain
  // signer // wallet //someone with enough gas
  // contract to interact with (ABI and addresses)

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // establishes a connection to the blockchain
    const signer = provider.getSigner(); // returns the connected account in metamask
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({value: ethers.utils.parseEther(sentAmount),});
      await listenForTransactionMine(transactionResponse,provider)
      console.log("Done")
    } catch (error) {
      console.log(error);
    }
  }
}
function listenForTransactionMine(transactionResponse, provider){
    console.log(`Mining ${transactionResponse.hash}...`)
    return new Promise((resolve, reject)=>{ // we wrap the function in a promise
        provider.once(transactionResponse.hash, (transactionReceipt)=>{
            console.log(`Completed with ${transactionReceipt.confirmations} Confirmations`)
            resolve()
        })
    })

}
