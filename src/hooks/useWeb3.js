import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";

import { ABI, ADDRESS } from "./../config";

export const useWeb3 = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});

  const handleChangeAccount = (account) => {
    setAccount(account[0]);
  };
  window.ethereum.on("accountsChanged", handleChangeAccount);

  const getData = useCallback(async () => {
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const contract = new web3.eth.Contract(ABI, ADDRESS);
    setContract(contract);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return { account, contract };
};
