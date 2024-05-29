import { ethers } from "./ethers-5.2.esm.min"

async function connect(){
    window.ethereum
    ? await window.ethereum.request({method: "eth_requestAccounts"})
    : alert("Metamask not installed!!")
}
async function fund(){
    window.ethereum
    ? alert("funding")
    : alert("Metamask not installed!!")
}