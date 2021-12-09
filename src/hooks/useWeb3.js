import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";

import { ABI, ADDRESS } from "./../config";

export const useWeb3 = () => {
  const [accounts, setAccounts] = useState("");
  const [contract, setContract] = useState({});
  const getData = useCallback(async () => {
    await window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    console.log("not:", accounts);
    const checksummedAccounts = accounts.map((account) =>
      web3.utils.toChecksumAddress(account)
    );
    console.log("yes:", checksummedAccounts);
    web3.defaultAccount = checksummedAccounts[0];

    setAccounts(checksummedAccounts);
    const contract = new web3.eth.Contract(ABI, ADDRESS);
    setContract(contract);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return { accounts, contract };
};
