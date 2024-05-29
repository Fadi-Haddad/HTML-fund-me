import { ethers } from "./ethers-5.2.esm.min.js"


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")

connectButton.onclick= connect
fundButton.onclick= fund

async function connect(){
    window.ethereum
    ? await window.ethereum.request({method: "eth_requestAccounts"})
    : alert("Metamask not installed!!")
}
async function fund(){
    // we will need provider // connection to the blockchain
    // signer // wallet //someone with enough gas
    // contract to interact with (ABI and addresses)

    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(Window.ethereum) // establish a connection to the blockchain
        const signer  = provider.getSigner() // returns the connected account in metamask
        console.log(signer)
    }
}