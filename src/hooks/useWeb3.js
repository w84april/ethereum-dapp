import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";

import { ABI, ADDRESS } from "./../config";

export const useWeb3 = (flag) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const [usersCount, setUsersCount] = useState(0);
  const [users, setUsers] = useState([]);
  const handleChangeAccount = (account) => {
    setAccount(account[0]);
  };
  window.ethereum.on("accountsChanged", handleChangeAccount);

  const getData = useCallback(async () => {
    setUsers([]);
    await window.ethereum.enable();
    const localNetwork = new Web3("http://127.0.0.1:7545");
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const localAccounts = await localNetwork.eth.getAccounts();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const contract = new web3.eth.Contract(ABI, ADDRESS);
    setContract(contract);
    const usersCountRaw = await contract.methods.getUsersCount().call();
    setUsersCount(usersCountRaw);

    localAccounts.forEach(async (account) => {
      const userRaw = await contract.methods.users(account).call();
      console.log(userRaw);
      const user = {
        address: account,
        name: userRaw.name,
        role: userRaw.role,
        date: userRaw.date,
      };
      setUsers((prev) => [...prev, user]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, [getData, flag]);

  return { account, contract, usersCount, users };
};
