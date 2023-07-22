import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, BrowserProvider } from "ethers";
import { loadContract } from "./utils";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum?: MetaMaskInpageProvider;
  provider?: BrowserProvider;
  contract?: Contract;
}

export type Web3State = {
  isLoading: boolean;
} & Web3Params;

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<{ children: any }> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      const provider = new BrowserProvider(window.ethereum);
      const contract = await loadContract("NftMarket", provider);

      setWeb3Api({
        contract,
        ethereum: window.ethereum, // Injected by metamask.
        isLoading: false,
        provider
      });
    }

    initWeb3();
  }, []);

  if (web3Api.provider) {
    web3Api.provider?.send("eth_requestAccounts", []);
  }

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

function createDefaultState() {
  return {
    ethereum: undefined,
    provider: undefined,
    contract: undefined,
    isLoading: true
  };
};

export default Web3Provider;
